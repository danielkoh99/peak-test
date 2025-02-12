"use client"
import { useQuery } from "@tanstack/react-query";
import { fetchTickerSearchResults } from "./api/fetchStocksApi";
import { useState } from "react";
import { SearchTickerRes } from "./types/types";
import useDebounce from "./hooks/useDebounce";
import { Autocomplete } from "@/components/stock/Autocomplete";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  // Use debounce to avoid making too many requests
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);

  const { data, error, isLoading } = useQuery<SearchTickerRes, Error>({
    queryKey: ['searchTickers', debouncedSearchQuery],
    queryFn: () => fetchTickerSearchResults<SearchTickerRes>(searchQuery),
    enabled: !!debouncedSearchQuery && debouncedSearchQuery.length > 2,
  });


  return (
    <div className="flex flex-col h-full w-full items-center justify-center text-gray-900 px-4 sm:px-6 md:px-8">
      <main className="flex flex-col items-center text-center gap-6 p-6 w-full max-w-xl">

        <Autocomplete searchQuery={searchQuery} setSearchQuery={setSearchQuery} data={data?.bestMatches} error={error} isLoading={isLoading}></Autocomplete>

      </main>
    </div>
  );
}
