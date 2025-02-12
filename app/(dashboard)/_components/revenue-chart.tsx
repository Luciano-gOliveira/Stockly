"use client"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/app/_components/ui/chart";
import { DayTotalRevenue } from "@/app/_data-access/dashboard/get-dashboard";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig: ChartConfig = {
    totalRevenue: {
        label: "Receita"
    }
}

interface RevenueChartProps {
    data: DayTotalRevenue[]
}

const RevenueChart = ({ data }: RevenueChartProps) => {
    return (
        <ChartContainer config={chartConfig} className="min-h-0 w-full">
            <BarChart accessibilityLayer data={data}>
                {/* campo que vou exibir no eixo X  que vem de data */}
                <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="totalRevenue" radius={4} /> {/* totalRevenue pra cada item do data em eixo y (a barrinha) */}
                <CartesianGrid vertical={false} />
            </BarChart>
        </ChartContainer>
    );
}

export default RevenueChart;