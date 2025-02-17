import { Loader2Icon } from "lucide-react";
import Header, {
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from "../_components/header";
import TotalRevenueCard from "./_components/total-revenue-card";
import TodayRevenueCard from "./_components/today-revenue-card";
import { Suspense } from "react";
import { Skeleton } from "../_components/ui/skeleton";
import TotalSales from "./_components/total-sales-card";
import TotalInStockCard from "./_components/total-in-stock-card";
import TotalProductCard from "./_components/total-product-card";
import TotalLast14DaysRevenueCard from "./_components/total-last-14-days-revenue-card";
import MostSoldProductsCard from "./_components/most-sold-product-card";

const Home = async () => {
  return (
    <div className="w-full px-8 mb-2 flex flex-col">
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Visão geral dos dados</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Suspense fallback={<Skeleton className="bg-white bg-opacity-80 rounded-xl p-4"><Loader2Icon className="animate-spin bg-opacity-50 text-slate-400" /></Skeleton>}>
          <TotalRevenueCard />
        </Suspense>

        <Suspense fallback={<Skeleton className="bg-white bg-opacity-80 rounded-xl p-4"><Loader2Icon className="animate-spin bg-opacity-50 text-slate-400" /></Skeleton>}>
          <TodayRevenueCard />
        </Suspense>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Suspense fallback={<Skeleton className="bg-white bg-opacity-80 rounded-xl p-4"><Loader2Icon className="animate-spin bg-opacity-50 text-slate-400" /></Skeleton>}>
          <TotalSales />
        </Suspense>
        <Suspense fallback={<Skeleton className="bg-white bg-opacity-80 rounded-xl p-4"><Loader2Icon className="animate-spin bg-opacity-50 text-slate-400" /></Skeleton>}>
          <TotalInStockCard />
        </Suspense>

        <TotalProductCard />
      </div>

      <div className="grid min-h-0 grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-4 mb-6">
      <Suspense fallback={<Skeleton className="bg-white mt-4 bg-opacity-80 rounded-xl p-4"><Loader2Icon className="animate-spin bg-opacity-50 text-slate-400" /></Skeleton>}>
        <TotalLast14DaysRevenueCard/>
      </Suspense>
      <Suspense fallback={<Skeleton className="bg-white mt-4 bg-opacity-80 rounded-xl p-4"><Loader2Icon className="animate-spin bg-opacity-50 text-slate-400" /></Skeleton>}>
        <MostSoldProductsCard/>
      </Suspense>
      </div>
    </div>
  );
};

export default Home;
