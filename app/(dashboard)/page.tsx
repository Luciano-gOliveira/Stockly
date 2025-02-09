import { CircleDollarSignIcon, DollarSignIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import Header, {
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import { SummaryCard, SummaryCardDescription, SummaryCardIcon, SummaryCardTitle } from "./_components/summary-card";
import { GetDashboard } from "../_data-access/dashboard/get-dashboard";
import { formatCurrency } from "../_helpers/currency";

const Home = async () => {
  const {totalRevenue, todayRevenue, totalSales, totalStock, totalProducts} = await GetDashboard()
  return (
    <div className="w-full px-8">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral dos dados</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="grid grid-cols-2 gap-6 mb-4">
          <SummaryCard>
            <SummaryCardIcon>
              <DollarSignIcon/>
            </SummaryCardIcon>
            <SummaryCardDescription>Total de vendas</SummaryCardDescription>
            <SummaryCardTitle>{formatCurrency(totalRevenue)}</SummaryCardTitle>
          </SummaryCard>
          <SummaryCard>
            <SummaryCardIcon>
              <DollarSignIcon/>
            </SummaryCardIcon>
            <SummaryCardDescription>Vendas hoje</SummaryCardDescription>
            <SummaryCardTitle>{formatCurrency(todayRevenue)}</SummaryCardTitle>
          </SummaryCard>          
      </div>
      <div className="grid grid-cols-3 gap-4">
          <SummaryCard>
            <SummaryCardIcon>
              <CircleDollarSignIcon/>
            </SummaryCardIcon>
            <SummaryCardDescription>Vendas totais</SummaryCardDescription>
            <SummaryCardTitle>{totalSales}</SummaryCardTitle>
          </SummaryCard>
          <SummaryCard>
            <SummaryCardIcon>
              <PackageIcon/>
            </SummaryCardIcon>
            <SummaryCardDescription>Total em estoque</SummaryCardDescription>
            <SummaryCardTitle>{totalStock}</SummaryCardTitle>
          </SummaryCard>  
          <SummaryCard>
            <SummaryCardIcon>
              <ShoppingBasketIcon/>
            </SummaryCardIcon>
            <SummaryCardDescription>Produtos</SummaryCardDescription>
            <SummaryCardTitle>{totalProducts}</SummaryCardTitle>
          </SummaryCard>       
      </div>
    </div>
  );
};

export default Home;
