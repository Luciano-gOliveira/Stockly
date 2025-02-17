import { ShoppingBasketIcon } from "lucide-react";
import { SummaryCard, SummaryCardIcon, SummaryCardDescription, SummaryCardTitle } from "./summary-card";
import { getTotalProduct } from "@/app/_data-access/dashboard/get-total-product";

const TotalProductCard = async() => {
    const totalProducts = await getTotalProduct()
    return ( 
        <SummaryCard>
          <SummaryCardIcon>
            <ShoppingBasketIcon />
          </SummaryCardIcon>
          <SummaryCardDescription>Produtos</SummaryCardDescription>
          <SummaryCardTitle>{Number(totalProducts)}</SummaryCardTitle>
        </SummaryCard>
     );
}
 
export default TotalProductCard;