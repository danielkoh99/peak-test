"use client"
import { useQuery } from "@tanstack/react-query";
import { fetchTickerSearchResults } from "./api/fetchStocksApi";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchTickerRes, Ticker } from "./types/types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { data, error, isLoading } = useQuery<SearchTickerRes, Error>({
    queryKey: ['searchTickers', searchQuery],
    queryFn: () => fetchTickerSearchResults<SearchTickerRes>('aapl'),
    enabled: !!searchQuery && searchQuery.length > 2,
  });


  return (
    <div className="flex flex-col h-full w-full items-center justify-center text-gray-900 px-4 sm:px-6 md:px-8">
      <main className="flex flex-col items-center text-center gap-6 p-6 w-full max-w-xl">
        <div className="relative w-full">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for symbols"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <pre className="w-full overflow-x-auto text-sm text-gray-500">{JSON.stringify(data, null, 2)}</pre>

          {searchQuery.length > 2 && !isLoading && data && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-md max-h-60 overflow-y-auto">
              {data.bestMatches?.map((match: Ticker) => (
                <div key={match["1. symbol"]} className="p-2 cursor-pointer hover:bg-gray-100">
                  <div className="text-sm font-semibold">{match["1. symbol"]}</div>
                  <div className="text-xs text-gray-500">{match["2. name"]}</div>
                </div>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="absolute z-10 w-full mt-1 text-gray-500">Loading...</div>
          )}
          {error && (
            <div className="absolute z-10 w-full mt-1 text-red-500">Error fetching results</div>
          )}
        </div>
      </main>
    </div>
  );
}
