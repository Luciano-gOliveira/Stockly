"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema, UpsertProductSchema } from "./schema";
import { actionClient } from "@/app/_lib/safe-action";


export const upsertProduct = actionClient.schema(upsertProductSchema).action( async ({parsedInput: data}) => {

  await db.product.upsert({
    //se o produto for achado, ele é atualizado, se não, é criado
    where: {id: data.id ?? ""},
    update: data,
    create: data
  })
    revalidatePath("/products");
}) 
