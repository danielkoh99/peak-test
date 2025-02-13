"use client"
import { useQuery } from "@tanstack/react-query";
import { fetchTickerSearchResults } from "./api/fetchStocksApi";
import { useEffect, useRef, useState } from "react";
import { SearchTickerRes } from "./types/types";
import useDebounce from "./hooks/useDebounce";
import { Autocomplete } from "@/components/stock/Autocomplete";
export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  // Use debounce to avoid making too many requests
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);
  // Set previous results, to show user results from previous queries
  const previousResults = useRef<SearchTickerRes | undefined>(undefined);

  const { data, error, isLoading } = useQuery<SearchTickerRes, Error>({
    queryKey: ['searchTickers', debouncedSearchQuery],
    queryFn: () => fetchTickerSearchResults<SearchTickerRes>(searchQuery),
    enabled: !!debouncedSearchQuery && debouncedSearchQuery.length > 2,
    initialData: () => previousResults.current,
  });
  useEffect(() => {
    previousResults.current = data
  }, [data])
  return (
    <div className="flex flex-col flex-1 items-center justify-center px-4 sm:px-6 md:px-8">
      <Autocomplete
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        data={data?.bestMatches}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
}
