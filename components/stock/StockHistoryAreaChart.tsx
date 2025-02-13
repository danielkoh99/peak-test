"use client"

import { CartesianGrid, Legend, Line, XAxis, YAxis, AreaChart, Area } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useMemo } from "react"
import { StockData } from "@/app/types/types"


const convertToChartData = (data: StockData['Monthly Time Series']) => {
    return Object.keys(data)
        .reverse()
        .map((date) => {
            const open = parseFloat(data[date]["1. open"]);
            const close = parseFloat(data[date]["4. close"]);

            return {
                date,
                open,
                close,
                high: parseFloat(data[date]["2. high"]),
                low: parseFloat(data[date]["3. low"]),
                volume: parseInt(data[date]["5. volume"]),
                color: close >= open ? "hsl(120, 60%, 50%)" : "hsl(0, 70%, 50%)",
            };
        });
};
const chartConfig = {
    open: {
        label: "Open",
        color: "hsl(var(--chart-1))",
    },
    close: {
        label: "Close",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export default function Chart({ data }: { data: StockData }) {
    const convertedChartData = useMemo(() => convertToChartData(data["Monthly Time Series"]), [data])

    return (
        <div className="flex flex-1 lg:w-2/3 w-full h-full ">
            <Card className="w-full h-full shadow-lg rounded-lg overflow-hidden ">
                <CardHeader className="flex flex-col bg-green-500 items-stretch space-y-0 border-b p-0 sm:flex-row text-white">
                    <div className="text-xl font-semibold flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>
                            Historical prices for
                            <span className="italic">{data["Meta Data"]["2. Symbol"]}
                            </span>
                        </CardTitle>
                        <CardDescription>

                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="w-full">
                        <AreaChart
                            width={1000}
                            height={800}
                            data={convertedChartData}
                            margin={{
                                bottom: 20,
                            }}
                        >

                            <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: 10 }} />
                            <Area
                                dataKey="open"
                                type="monotone"
                                fillOpacity={0.4}
                                fill="var(--color-open)"
                                stroke="var(--color-open)"
                                stackId="a"
                            />
                            <Area
                                dataKey="close"
                                type="monotone"
                                fill="var(--color-close)"
                                stroke="var(--color-close)"
                                fillOpacity={0.4}
                                stackId="a"
                            />
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                                angle={-45}
                                textAnchor="end"
                                tickMargin={10}
                            />
                            <YAxis domain={['auto', 'auto']} />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Line
                                type="monotone"
                                dataKey="close"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
