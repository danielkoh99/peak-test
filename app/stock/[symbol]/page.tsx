import { StockData, StockDetailsRes } from "@/app/types/types";
import Chart from "@/components/stock/Chart";
import { StockDetailsView } from "@/components/stock/StockDetails";
import React from "react";
export default async function SymbolDetailsPage({
    params
}: {
    params: { symbol: string };
}) {
    const { symbol } = await params

    const detailsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const historicalDataRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const symbolDetails: StockDetailsRes = await detailsRes.json();
    const historicalData: StockData = await historicalDataRes.json();
    if (!symbolDetails) {
        return (
            <div className="text-center text-lg text-red-600">
                Symbol not found
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
            <main className="flex flex-col items-center text-center gap-6 p-6 w-full">
                <StockDetailsView data={symbolDetails["Global Quote"]}></StockDetailsView>
                {!historicalData ? (
                    <div className="text-center text-lg text-red-600">
                        No symbol found
                    </div>
                ) :
                    <Chart data={historicalData}></Chart>
                }
            </main>
        </div >
    );
}