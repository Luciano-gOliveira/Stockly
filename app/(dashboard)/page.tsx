import { CircleDollarSignIcon, DollarSignIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react";
import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import { SummaryCard, SummaryCardDescription, SummaryCardIcon, SummaryCardTitle } from "./_components/summary-card";
import { GetDashboard } from "../_data-access/dashboard/get-dashboard";
import { formatCurrency } from "../_helpers/currency";
import RevenueChart from "./_components/revenue-chart";

const Home = async () => {
  const {totalRevenue, todayRevenue, totalSales, totalStock, totalProducts, totalLast14DaysRevenue} = await GetDashboard()
  return (
    <div className="w-full px-8 flex flex-col">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral dos dados</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="grid grid-cols-2 gap-4 mb-4">
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

      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-6 my-4">
        {/* <div className="mb-2 h-9 w-9 items-center flex rounded-xl justify-center bg-emerald-500 bg-opacity-10">
          <DollarSignIcon className="text-emerald-500"/>
        </div> */}
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-slate-900">Receita</p>
          
          <p className="text-sm text-slate-400"><span className="text-emerald-400">•</span> Últimos 14 dias</p>
        </div>
        <RevenueChart data={totalLast14DaysRevenue}/>
      </div>
    </div>
  );
};

export default Home;
