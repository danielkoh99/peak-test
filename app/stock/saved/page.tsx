"use client"
import { useSavedItems } from "@/app/contexts/SavedItemContext";
import SingleTickerItem from "@/components/stock/SingleTickerItem";

export default function SavedItems() {
    const { savedItems } = useSavedItems();

    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
            <main className="flex flex-col items-center text-center gap-6 p-6 w-full">

                <h2 className="text-xl font-semibold mb-4">Saved Items</h2>

                <div className="flex flex-col justify-center items-center w-full h-full
                    mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto transition-all duration-200 no-scrollbar ">

                    {savedItems.length === 0 && <p className="text-lg ">No saved items</p>}
                    {savedItems.length > 0 && savedItems.map((match) => (
                        <SingleTickerItem key={match["1. symbol"]} match={match} />
                    )
                    )}
                </div>

            </main>

        </div>
    );
}