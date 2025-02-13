import { Ticker } from "@/app/types/types";
import { Input } from "../ui/input";
import AutocompleteItem from "./AutocompleteItem";

interface AutocompleteProps<T> {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    data?: T extends Ticker ? T[] : never;
    isLoading: boolean;
    error: Error | null;
}
export function Autocomplete<T>({
    searchQuery,
    setSearchQuery,
    data,
    isLoading,
    error,
}: AutocompleteProps<T>) {
    return (
        <div className="relative w-full">
            <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for symbols"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
               transition-all duration-200"
            />

            {!isLoading && !error && searchQuery.length > 2 && (
                <div className="absolute left-0 right-0 z-10 mt-2 w-full bg-white border border-gray-200 
                    rounded-lg shadow-lg max-h-60 overflow-y-auto transition-all duration-200">

                    {isLoading && (
                        <div className="p-3 text-gray-500 text-center">Loading...</div>
                    )}

                    {error && (
                        <div className="p-3 text-red-500 text-center">Error fetching results</div>
                    )}

                    {data?.map((match: Ticker) => (
                        <AutocompleteItem
                            key={match["1. symbol"]}
                            match={match}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}