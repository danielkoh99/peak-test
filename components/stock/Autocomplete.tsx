"use client"
import { SearchTickerRes, Ticker } from "@/app/types/types";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
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
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (searchQuery.length > 0 && data?.bestMatches && data.bestMatches.length > 0) {
            setShowResults(true)
        }
    }, [searchQuery, setShowResults, data?.bestMatches])
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div ref={containerRef} className="relative lg:w-1/2 w-full"

        >
            <Input
                onFocus={() => setShowResults(true)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for symbols"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
               transition-all duration-200"
            />

            {showResults && !isLoading && !error && searchQuery.length > 2 && (
                <div onBlur={() => setShowResults(false)} className="absolute left-0 right-0 z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto transition-all duration-200 no-scrollbar">
                    {data?.Information && (
                        <div className="p-3 text-gray-500 text-center">{data?.Information}</div>
                    )}
                    {isLoading && (
                        <div className="p-3 text-gray-500 text-center">Loading...</div>
                    )}

                    {error && (
                        <div className="p-3 text-red-500 text-center">Error fetching results</div>
                    )}
                    {data?.bestMatches?.length === 0 && (
                        <div className="p-3 text-gray-500 text-center">No results found</div>
                    )}
                    {data?.bestMatches?.map((match: Ticker) => (
                        <SingleTickerItem
                            key={match["1. symbol"]}
                            match={match}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}