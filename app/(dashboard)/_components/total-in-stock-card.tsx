import { PackageIcon } from "lucide-react";
import { SummaryCard, SummaryCardIcon, SummaryCardDescription, SummaryCardTitle } from "./summary-card";
import { getTotalInStock } from "@/app/_data-access/dashboard/get-total-in-stock";

const TotalInStockCard = async() => {
    const totalStock = await getTotalInStock()
    return ( 
        <SummaryCard>
          <SummaryCardIcon>
            <PackageIcon />
          </SummaryCardIcon>
          <SummaryCardDescription>Total em estoque</SummaryCardDescription>
          <SummaryCardTitle>{totalStock}</SummaryCardTitle>
        </SummaryCard>
     );
}
 
export default TotalInStockCard;