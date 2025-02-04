import { db } from '@/app/_lib/prisma';
import { Sale, SaleProduct } from '@prisma/client';
import { Quando } from 'next/font/google';

interface SaleProductDto { //para acessar somente o que vai ser preciso no upsert / adicionado no saleproducts do dto exportado
    productId: string
    unitPrice: number
    quantity: number
    productName: string
}

export interface SaleDto {
    id: string
    productNames: string
    productTotal: number
    totalAmount: number
    date: Date
    saleProducts: SaleProductDto[] // novo campo adicionado após precisar disso no dto para chamar os produtos da venda na props do dropdown para passar pro upsert
}

export const getSales = async (): Promise<SaleDto[]> =>  {
    const sales = await db.sale.findMany({
        include: {
            saleProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    return sales.map((sale) => ({
        id: sale.id,
        //em saleProducts tem uma lista de produtos
        productNames: sale.saleProducts.map((saleProduct) =>  saleProduct.product.name).join(" • "),
        productTotal: sale.saleProducts.reduce((total, saleProduct) => total + saleProduct.quantity, 0),
        totalAmount: sale.saleProducts.reduce((total, saleProduct) => total + Number(saleProduct.product.price) * saleProduct.quantity, 0),
        date: sale.date,
        saleProducts: sale.saleProducts.map(saleProduct => ({
            productId: saleProduct.productId,
            unitPrice: Number(saleProduct.unitPrice),
            quantity: saleProduct.quantity,
            productName: saleProduct.product.name

        })) //chamado após adicionar um novo campo na dto
    }))
} 