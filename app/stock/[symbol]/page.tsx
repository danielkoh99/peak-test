import { StockData, StockDetailsRes } from "@/app/types/types";
import StockHistoryAreaChart from "@/components/stock/StockHistoryAreaChart";
import { StockDetailsView } from "@/components/stock/StockDetails";
import GenericError from "@/components/Error";

type ParamsType = { symbol: string };

async function fetchStockData<T>(url: string): Promise<T | { error: string }> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        const result = (await response.json()) as T;
        return result;
    } catch (error: unknown) {
        let errorMessage = "An unknown error occurred";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return { error: errorMessage };
    }
}

export default async function SymbolDetailsPage({ params }: { params: ParamsType }) {
    const { symbol } = (await params);

    if (!symbol) {
        return <GenericError>Invalid stock symbol.</GenericError>;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    const [symbolDetails, historicalData] = await Promise.all([
        fetchStockData<StockDetailsRes>(`${apiUrl}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`),
        fetchStockData<StockData>(`${apiUrl}/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`)
    ]);

    if ("error" in symbolDetails || "error" in historicalData) {
        return <GenericError>Failed to fetch stock data. Try again later.</GenericError>;
    }

    if (symbolDetails["Information"] || historicalData["Information"]) {
        return <GenericError>{symbolDetails["Information"] || historicalData["Information"]}</GenericError>;
    }

    if (historicalData["Error Message"]) {
        return <GenericError>Invalid stock symbol or API error.</GenericError>;
    }

    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
            <main className="flex flex-col items-center text-center gap-6 p-6 w-full">
                {!symbolDetails?.["Global Quote"] ? (
                    <GenericError>Stock data unavailable.</GenericError>
                ) : (
                    <StockDetailsView data={symbolDetails["Global Quote"]} />
                )}

                {historicalData && !historicalData["Error Message"] && !historicalData["Information"] ? (
                    <StockHistoryAreaChart data={historicalData} />
                ) : (
                    <GenericError>Historical data unavailable.</GenericError>
                )}
            </main>
        </div>
    );
}