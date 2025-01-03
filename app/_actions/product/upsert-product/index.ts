"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema, UpsertProductSchema } from "./schema";

export const upsertProduct = async (data: UpsertProductSchema) => {
  upsertProductSchema.parse(data);
  await db.product.upsert({
    //se o produto for achado, ele é atualizado, se não, é criado
    where: {id: data.id ?? ""},
    update: data,
    create: data
  })
    revalidatePath("/products");
};
