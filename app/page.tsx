"use client"
import { useQuery } from "@tanstack/react-query";
import { fetchTickerSearchResults } from "./api/fetchStocksApi";
import { useState } from "react";
import { SearchTickerRes } from "./types/types";
import useDebounce from "./hooks/useDebounce";
import { Autocomplete } from "@/components/stock/Autocomplete";
import PrevSearchList from "@/components/stock/PrevSearchList";
export default function Home() {

  const [searchQuery, setSearchQuery] = useState<string>("")
  // Use debounce to avoid making too many requests
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);
  // Set previous results, to show user results from previous queries

  const { data, error, isLoading } = useQuery<SearchTickerRes, Error>({
    queryKey: ['searchTickers', debouncedSearchQuery],
    queryFn: () => fetchTickerSearchResults<SearchTickerRes>(searchQuery),
    enabled: !!debouncedSearchQuery && debouncedSearchQuery.length > 2,
  });
  return (
    <div className="flex flex-col h-screen items-center px-4 sm:px-6 md:px-8 gap-6">
      <p className="text-lg font-semibold">Search for a stock</p>

      <Autocomplete
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        data={data}
        error={error}
        isLoading={isLoading}
      />

      <PrevSearchList data={data} />
    </div>
  );
}
