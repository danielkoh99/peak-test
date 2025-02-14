"use client"
import { SearchTickerRes, Ticker } from "@/app/types/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import SaveItemButton from "./SaveItemButton";


export default function StockList({ data }: { data: SearchTickerRes | undefined }) {
    const [prevResults, setPrevResults] = useState<SearchTickerRes | undefined>(undefined);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const storedResults = localStorage.getItem("previousResults");
        if (storedResults) {
            setPrevResults(JSON.parse(storedResults));
        }
    }, []); // On mount load from localstorage

    useEffect(() => {
        if (typeof window === "undefined" || !data?.bestMatches) return;

        const prevResultsLocalStorage: SearchTickerRes = JSON.parse(localStorage.getItem("previousResults") || "{}");

        const newMatches = data.bestMatches.filter(
            (newMatch) =>
                !prevResultsLocalStorage?.bestMatches?.some(
                    (existingMatch: Ticker) => existingMatch["1. symbol"] === newMatch["1. symbol"]
                )
        );

        if (newMatches.length > 0) {
            const updatedResults: SearchTickerRes = {
                ...prevResultsLocalStorage,
                bestMatches: [...(prevResultsLocalStorage.bestMatches || []), ...newMatches],
            };

            localStorage.setItem("previousResults", JSON.stringify(updatedResults));
            setPrevResults(updatedResults);
        }

        if (prevResults?.bestMatches && prevResults?.bestMatches?.length > 20) {
            localStorage.removeItem("previousResults");
        }
    }, [data, prevResults]);

    if (!prevResults || prevResults?.bestMatches?.length === 0) return (
        <p className="text-lg font-semibold">No previous search results</p>
    )
    return (
        <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold w-full text-center">Previous search results</p>
            <div className="flex flex-wrap gap-4 w-full justify-center max-h-96 overflow-y-auto">
                {prevResults?.bestMatches?.map((stock) => (
                    <div key={stock["1. symbol"]} className="flex flex-col items-center text-center p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition w-full md:w-[180px] h-auto">
                        <Link href={`/stock/${stock["1. symbol"]}`} passHref className="flex flex-col gap-4 h-full">
                            <h3 className="font-semibold">{stock["1. symbol"]}</h3>
                            <p className="text-sm text-gray-600 text-center">{stock["2. name"]}</p>
                        </Link>
                        <SaveItemButton item={stock} />
                    </div>
                ))}
            </div>
        </div>
    );
}