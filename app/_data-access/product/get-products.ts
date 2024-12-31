import "server-only";

import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getProducts = async (): Promise<Product[]> => {
    console.log("getProducts");
  return db.product.findMany({});
};

//database caching e ISR
export const cachedGetProducts = unstable_cache(getProducts, ["get-products"], {
  // tags: ["get-products"],
  revalidate: 5,
});

//Function Memoization com React Cache
export const gretProductsWithCache = cache(getProducts)

//function memoization em outras funções
export const sum = cache((a: number, b: number) =>{
    console.log("SUMMing")
    return a + b
}) //com cache só vai dar Summing uma vez

// export const createProduct = async (product: Product): Promise<void> => {
//     await db.product.create({
//         data: product
//     })
// }
