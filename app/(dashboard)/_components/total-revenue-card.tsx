import { formatCurrency } from "@/app/_helpers/currency";
import { DollarSignIcon } from "lucide-react";
import { SummaryCard, SummaryCardDescription, SummaryCardIcon, SummaryCardTitle } from "./summary-card";
import { getTotalRevenue } from "@/app/_data-access/dashboard/get-total-revenue";


const TotalRevenueCard = async() => {
    const totalRevenue = await getTotalRevenue()
    return ( 
        <SummaryCard>
          <SummaryCardIcon>
            <DollarSignIcon />
          </SummaryCardIcon>
          <SummaryCardDescription>Total de vendas</SummaryCardDescription>
          <SummaryCardTitle>{formatCurrency(Number(totalRevenue))}</SummaryCardTitle>
        </SummaryCard>
     );
}
 
export default TotalRevenueCard;