"use server";

import { db } from "@/app/_lib/prisma";
import { upsertSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const upsertSale = actionClient
  .schema(upsertSaleSchema)
  .action(async ({ parsedInput: { products, id } }) => {
    // throw new Error()

    const isUpdate = Boolean(id); //se tiver id, eu estou atualizando

    await db.$transaction(async (trx) => {
      if (isUpdate) {
        //deleta a venda
        const existingSale = await trx.sale.findUnique({
          where: { id },
          include: { saleProducts: true },
        });
        if (!existingSale) return;
        await trx.sale.delete({
          where: { id },
        });
        for (const product of existingSale.saleProducts) {
          //para cada produto dessa sale.saleProducts
          await trx.product.update({
            where: { id: product.productId },
            data: {
              stock: {
                increment: product.quantity,
              },
            },
          });
        }
      } //isso deleta a venda e restaura o estoque dos produtos dessa venda, e abaixo crio a venda (deleto a venda se ela existir e criar ela de novo)

      const sale = await trx.sale.create({
        data: {
          date: new Date(),
        },
      });
      for (const product of products) {
        const productFromDb = await trx.product.findUnique({
          where: {
            id: product.id,
          },
        });
        if (!productFromDb) {
          returnValidationErrors(upsertSaleSchema, {
            _errors: ["Produto não encontrado"],
          });
        }

        const productIsOutOfStock = product.quantity > productFromDb.stock;
        if (productIsOutOfStock) {
          returnValidationErrors(upsertSaleSchema, {
            _errors: ["Produto fora de estoque"],
          });
        }
        await trx.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: productFromDb.price,
          },
        });

        await trx.product.update({
          where: {
            id: product.id,
          },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        });
      }
    });
    revalidatePath("/products");
    revalidatePath("/sales")
  });
