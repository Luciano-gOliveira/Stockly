import "server-only"

import { db } from "@/app/_lib/prisma";

export const getProducts = async () => {
    return db.product.findMany({});
}