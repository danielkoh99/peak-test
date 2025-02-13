import { Ticker } from "@/app/types/types";
import { StarIcon } from "lucide-react";
import { useEffect } from "react";

export default function SingleTickerItem({ match, savedItems, setSavedItems }: { match: Ticker, savedItems: Ticker[], setSavedItems: React.Dispatch<React.SetStateAction<Ticker[]>> }) {

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("savedItems") || "[]");
        setSavedItems(storedItems);
    }, []);

    const isSaved = savedItems.some(item => item["1. symbol"] === match["1. symbol"]);
    const saveItem = () => {
        const updatedItems = isSaved
            ? savedItems.filter((item) => item !== match)
            : [...savedItems, match];

        setSavedItems(updatedItems);
        localStorage.setItem("savedItems", JSON.stringify(updatedItems));
    };
    const unsaveItem = () => {
        const updatedItems = savedItems.filter((item) => item["1. symbol"] !== match["1. symbol"]);
        setSavedItems(updatedItems);
        localStorage.setItem("savedItems", JSON.stringify(updatedItems));
    }
    return (
        <div className="flex w-full items-center justify-between p-2 border-b">
            <div>
                <h3 className="font-semibold">{match["1. symbol"]}</h3>
                <p className="text-sm text-gray-600">{match["2. name"]}</p>
                <p className="text-sm text-gray-600">{match["8. currency"]}</p>
            </div>
            <StarIcon
                onClick={isSaved ? unsaveItem : saveItem}
                className={`w-5 h-5 cursor-pointer transition-all ${isSaved ? "fill-yellow-500 text-yellow-500" : "text-gray-400 hover:fill-yellow-500"
                    }`}
            />
        </div>
    );
}