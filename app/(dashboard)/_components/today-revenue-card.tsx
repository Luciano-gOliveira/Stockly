import { formatCurrency } from "@/app/_helpers/currency";
import { DollarSignIcon } from "lucide-react";
import { SummaryCard, SummaryCardIcon, SummaryCardDescription, SummaryCardTitle } from "./summary-card";
import { getTodayRevenue } from "@/app/_data-access/dashboard/get-today-revenue";

const TodayRevenueCard = async () => {
    const todayRevue = await getTodayRevenue()
    return (
        <SummaryCard>
            <SummaryCardIcon>
                <DollarSignIcon />
            </SummaryCardIcon>
            <SummaryCardDescription>Vendas hoje</SummaryCardDescription>
            <SummaryCardTitle>{formatCurrency(Number(todayRevue))}</SummaryCardTitle>
        </SummaryCard>
    );
}

export default TodayRevenueCard;