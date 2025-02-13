"use client"
import { Ticker } from "@/app/types/types";
import SingleTickerItem from "@/components/stock/SingleTickerItem";
import { useEffect, useState } from "react";

export default function SavedItems() {
    const [savedItems, setSavedItems] = useState<Ticker[]>([]);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("savedItems") || "[]");
        setSavedItems(items);
    }, []);

    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
            <main className="flex flex-col items-center text-center gap-6 p-6 w-full">

                <h2 className="text-xl font-semibold mb-4">Saved Items</h2>

                {savedItems.length > 0 && savedItems.map((match) => (
                    <SingleTickerItem key={match["1. symbol"]} match={match} savedItems={savedItems} setSavedItems={setSavedItems}></SingleTickerItem>
                )
                )}
            </main>

        </div>
    );
}