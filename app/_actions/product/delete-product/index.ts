"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import { deleteProductSchema, DeleteProductSchema } from "./schema"
import { actionClient } from "@/app/_lib/safe-action"
import { returnValidationErrors } from "next-safe-action"

export const deleteProductAction = actionClient.schema(deleteProductSchema).action(async ({parsedInput: {id}})=> {

    const productOfDb = await db.product.findUnique({
        where: {
            id
        }
    })
    if(!productOfDb){
        returnValidationErrors(deleteProductSchema, {
            _errors: ["Produto não encontrado"]
        })
    }
    await db.product.delete({
        where: {
            id
        }
    })
    revalidatePath("/", "layout")
})  