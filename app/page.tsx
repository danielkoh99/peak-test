"use client"
import { useQuery } from "@tanstack/react-query";
import { fetchTickerSearchResults } from "./api/fetchStocksApi";
import { useEffect, useRef, useState } from "react";
import { SearchTickerRes } from "./types/types";
import useDebounce from "./hooks/useDebounce";
import { Autocomplete } from "@/components/stock/Autocomplete";
import PrevSearchList from "@/components/stock/PrevSearchList";
export default function Home() {
  const prevResultsLocalStorage: SearchTickerRes = JSON.parse(localStorage.getItem('previousResults') || '[]');
  const [searchQuery, setSearchQuery] = useState<string>("")
  // Use debounce to avoid making too many requests
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);
  // Set previous results, to show user results from previous queries
  const previousResults = useRef<SearchTickerRes | undefined>(prevResultsLocalStorage);

  const { data, error, isLoading } = useQuery<SearchTickerRes, Error>({
    queryKey: ['searchTickers', debouncedSearchQuery],
    queryFn: () => fetchTickerSearchResults<SearchTickerRes>(searchQuery),
    enabled: !!debouncedSearchQuery && debouncedSearchQuery.length > 2,
  });
  useEffect(() => {
    if (!data) return
    previousResults.current = data
    if (!data.Information) {
      localStorage.setItem('previousResults', JSON.stringify(data))
    }
    const prevResultsLocalStorage: SearchTickerRes = JSON.parse(localStorage.getItem('previousResults') || '[]');
    if (prevResultsLocalStorage && prevResultsLocalStorage.bestMatches && prevResultsLocalStorage.bestMatches.length > 10) {
      localStorage.removeItem('previousResults')
    }
  }, [data])

  return (
    <div className="flex flex-col flex-1 items-center px-4 sm:px-6 md:px-8 gap-10">
      <Autocomplete
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        data={data}
        error={error}
        isLoading={isLoading}
      />
      <PrevSearchList data={previousResults.current?.bestMatches} />
    </div>
  );
}
