import { db } from '@/app/_lib/prisma';
import { Sale } from '@prisma/client';

export interface SaleDto {
    id: string
    productNames: string[]
    productTotal: number
    totalAmount: number
    date: Date
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
        productNames: sale.saleProducts.map((saleProduct) =>  saleProduct.product.name),
        productTotal: sale.saleProducts.reduce((total, saleProduct) => total + saleProduct.quantity, 0),
        totalAmount: sale.saleProducts.reduce((total, saleProduct) => total + Number(saleProduct.product.price) * saleProduct.quantity, 0),
        date: sale.date
    }))
} 