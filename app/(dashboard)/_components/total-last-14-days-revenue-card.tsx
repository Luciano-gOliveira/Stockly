import { GetTotalLast14DaysRevenue } from "@/app/_data-access/dashboard/get-total-last-14-days-revenue";
import RevenueChart from "./revenue-chart";


const TotalLast14DaysRevenueCard = async() => {
      const totalLast14DaysRevenue = await GetTotalLast14DaysRevenue()
    
    return ( 
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white p-4 my-4">
          {/* <div className="mb-2 h-9 w-9 items-center flex rounded-xl justify-center bg-emerald-500 bg-opacity-10">
            <DollarSignIcon className="text-emerald-500"/>
          </div> */}
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-slate-900">Receita</p>

            <p className="text-sm text-slate-400"><span className="text-emerald-400">•</span> Últimos 14 dias</p>
          </div>
            <RevenueChart data={totalLast14DaysRevenue} />
        </div>
     );
}
 
export default TotalLast14DaysRevenueCard;