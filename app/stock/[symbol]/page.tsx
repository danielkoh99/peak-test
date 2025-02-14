import { StockData, StockDetailsRes } from "@/app/types/types";
import StockHistoryAreaChart from "@/components/stock/StockHistoryAreaChart";
import { StockDetailsView } from "@/components/stock/StockDetails";
type ParamsType = Promise<{ symbol: string }>;

export default async function SymbolDetailsPage(props: { params: ParamsType }) {
    const { symbol } = (await props.params)
    const detailsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const historicalDataRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const symbolDetails: StockDetailsRes = await detailsRes.json();
    const historicalData: StockData = await historicalDataRes.json();
    if (!symbolDetails || !symbol) {
        return (
            <div className="text-center text-lg text-red-600">
                Symbol not found
            </div>
        );
    }
    if (symbolDetails['Information']) {
        return (
            <div className="text-center text-lg text-red-600">
                {symbolDetails['Information']}
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
            <main className="flex flex-col items-center text-center gap-6 p-6 w-full">
                {!symbol || !symbolDetails ? (
                    <div className="text-center text-lg text-red-600">
                        No symbol found
                    </div>
                ) :

                    <StockDetailsView data={symbolDetails["Global Quote"]} />

                }
                {historicalData && !historicalData["Error Message"] && !historicalData["Information"] && (
                    <StockHistoryAreaChart data={historicalData} />
                )}
            </main>
        </div >
    );
}