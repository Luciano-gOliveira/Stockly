import { db } from "@/app/_lib/prisma"
import dayjs from "dayjs"


export interface DayTotalRevenue {
  // day: Date
  day: string
  totalRevenue: number
}


export const GetTotalLast14DaysRevenue = async(): Promise<DayTotalRevenue[]> => {
    const today = dayjs().endOf("day").toDate()
      const last14days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(day => {
        return dayjs(today).subtract(day, "day")
      })
    
      const totalLast14DaysRevenue: DayTotalRevenue[] = []
      for (const day of last14days) {
        const dayTotalRevenue = await db.$queryRawUnsafe<{ totalRevenue: number }[]>(
          `
            SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalRevenue"
            FROM "SaleProduct"
            JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id" 
            WHERE "Sale"."date" > $1 AND "Sale"."date" < $2;
          `,
          day.startOf("day").toDate(),
          day.endOf("day").toDate()
        )
        // console.log({totalLast14DaysRevenue})
        totalLast14DaysRevenue.push({
          // day: day.toDate(),
          day: day.format("DD/MM"),
          totalRevenue: dayTotalRevenue[0].totalRevenue
        })
      }

      return totalLast14DaysRevenue
}