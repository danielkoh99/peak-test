"use client";

import { SearchTickerRes, Ticker } from "@/app/types/types";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import SingleTickerItem from "./SingleTickerItem";
import GenericError from "../Error";
import LoadingSpinner from "../LoadingSpinner";

interface AutocompleteProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    data?: SearchTickerRes;
    isLoading: boolean;
    error: Error | null;
}

export default function Autocomplete({
    searchQuery,
    setSearchQuery,
    data,
    isLoading,
    error,
}: AutocompleteProps) {
    const [showResults, setShowResults] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isLoading) {
            timer = setTimeout(() => setShowSpinner(true), 500);
        } else {
            setShowSpinner(false);
        }
        return () => clearTimeout(timer);
    }, [isLoading]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setShowResults(false);
            setSearchQuery("");
        }
    };

    useEffect(() => {
        if (searchQuery.length > 0 && data?.bestMatches && data.bestMatches.length > 0) {
            setShowResults(true);
        }
    }, [searchQuery, setShowResults, data?.bestMatches]);

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
        <div ref={containerRef} className="relative lg:w-1/2 w-full">
            <Input
                onKeyDown={handleKeyDown}
                onFocus={() => setShowResults(true)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for symbols"
                className="w-full px-5 py-3 rounded-xl border border-gray-300 shadow-md 
             bg-white text-gray-700 placeholder-gray-400 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
             transition-all duration-200"
            />

            {showResults && searchQuery.length > 2 && (
                <div
                    onBlur={() => setShowResults(false)}
                    className="absolute left-0 right-0 z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto transition-all duration-200 no-scrollbar"
                >
                    {data?.Information && (
                        <GenericError>{data.Information}</GenericError>
                    )}
                    {showSpinner && <LoadingSpinner />}
                    {error && <GenericError>Error fetching results</GenericError>}
                    {data?.bestMatches?.length === 0 && (
                        <div className="p-3 text-gray-500 text-center">No results found</div>
                    )}
                    {data?.bestMatches?.map((match: Ticker) => (
                        <SingleTickerItem key={match["1. symbol"]} match={match} />
                    ))}
                </div>
            )}
        </div>
    );
}