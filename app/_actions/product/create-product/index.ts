"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import { createProductSchema, CreateProductSchema } from "./product-schema"

export const createProductAction = async (data: CreateProductSchema) => {
    createProductSchema.parse(data)
    await db.product.create({
        data
    }),
    revalidatePath("/products")
}