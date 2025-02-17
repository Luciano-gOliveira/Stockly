import { db } from "@/app/_lib/prisma";

export const getTotalProduct = async (): Promise<number> => {
    //uma forma de fazer direto 
    return db.product.count();
}