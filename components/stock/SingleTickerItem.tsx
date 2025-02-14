"use client";
import { useSavedItems } from "@/app/contexts/SavedItemContext";
import { Ticker } from "@/app/types/types";
import { StarIcon } from "lucide-react";
import Link from "next/link";

export default function SingleTickerItem({ match }: { match: Ticker }) {
    const { isSaved, unsaveItem, saveItem } = useSavedItems();
    const saved = isSaved(match["1. symbol"])
    const handleSaveItem = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (saved) {
            unsaveItem(match["1. symbol"])
        } else {
            saveItem(match)
        }
    }
    return (
        <div className="flex w-full items-center justify-between p-2 border-b hover:bg-gray-100">
            <Link href={`/stock/${match["1. symbol"]}`} className="flex w-full ">
                <div className="flex flex-col text-start">
                    <h3 className="font-semibold">{match["1. symbol"]}</h3>
                    <p className="text-sm text-gray-600">{match["2. name"]}</p>
                    <p className="text-sm text-gray-600">{match["8. currency"]}</p>
                </div>
            </Link>
            <button onClick={handleSaveItem} className="ml-2 p-4">
                <StarIcon
                    className={`w-5 h-5 cursor-pointer transition-all ${saved ? "fill-yellow-500 text-yellow-500" : "text-gray-400 hover:fill-yellow-500"
                        }`}
                />
            </button>
        </div>
    );
}