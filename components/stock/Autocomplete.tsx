import { SearchTickerRes, Ticker } from "@/app/types/types";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import SingleTickerItem from "./SingleTickerItem";

interface AutocompleteProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    data?: SearchTickerRes;
    isLoading: boolean;
    error: Error | null;
}
export function Autocomplete({
    searchQuery,
    setSearchQuery,
    data,
    isLoading,
    error,
}: AutocompleteProps) {
    const [showResults, setShowResults] = useState(false);
    const [savedItems, setSavedItems] = useState<Ticker[]>([]);
    useEffect(() => {
        const items = JSON.parse(localStorage.getItem("savedItems") || "[]");
        setSavedItems(items);
        if (data?.Information) {
            setShowResults(true)
        }
    }, [data]);

    return (
        <div className="relative lg:w-1/2 w-full">
            <Input
                onBlur={() => setShowResults(false)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for symbols"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
               transition-all duration-200"
            />

            {showResults && !isLoading && !error && searchQuery.length > 2 && (
                <div className="absolute left-0 right-0 z-10 mt-2 w-full bg-white border border-gray-200 
                    rounded-lg shadow-lg max-h-60 overflow-y-auto transition-all duration-200">
                    {data?.Information && (
                        <div className="p-3 text-gray-500 text-center">{data?.Information}</div>
                    )}
                    {isLoading && (
                        <div className="p-3 text-gray-500 text-center">Loading...</div>
                    )}

                    {error && (
                        <div className="p-3 text-red-500 text-center">Error fetching results</div>
                    )}

                    {data?.bestMatches?.map((match: Ticker) => (
                        <SingleTickerItem
                            savedItems={savedItems}
                            setSavedItems={setSavedItems}
                            key={match["1. symbol"]}
                            match={match}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}