import React from "react";

export default async function SymbolDetailsPage({
    params
}: {
    params: { symbol: string };
}) {
    const { symbol } = await params

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const symbolDetails = await response.json();
    console.log(symbolDetails)
    if (!symbolDetails) {
        return (
            <div className="text-center text-lg text-red-600">
                Symbol not found
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full items-center justify-center">
            <main className="flex flex-col items-center text-center gap-6 p-6">
                <h1>{symbol}</h1>
            </main>
        </div >
    );
}