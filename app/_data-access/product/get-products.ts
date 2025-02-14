import "server-only";

import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export type ProductStatusDto = "IN_STOCK" | "OUT_OF_STOCK"

//no prisma client existia um extends que verificava se o produto estava ou não no estoque,
//podemos retirá-lo de do prisma client e fazer isso em um DTO
export interface ProductDto extends Product{
  status: ProductStatusDto
}

export const getProducts = async (): Promise<ProductDto[]> => {
    // console.log("getProducts");
  const products = await db.product.findMany({});
  return products.map((product) => ({
    ...product, 
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK"
  }))
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
