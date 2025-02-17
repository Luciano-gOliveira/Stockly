import { CircleDollarSignIcon } from "lucide-react";
import { SummaryCard, SummaryCardIcon, SummaryCardDescription, SummaryCardTitle } from "./summary-card";
import { getTotalSales } from "@/app/_data-access/dashboard/get-total-sales";


const TotalSales = async() => {
    const totalSales = await getTotalSales()
    return ( 
        <SummaryCard>
          <SummaryCardIcon>
            <CircleDollarSignIcon />
          </SummaryCardIcon>
          <SummaryCardDescription>Vendas totais</SummaryCardDescription>
          <SummaryCardTitle>{Number(totalSales)}</SummaryCardTitle>
        </SummaryCard>
     );
}
 
export default TotalSales;