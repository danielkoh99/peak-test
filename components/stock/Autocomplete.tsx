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
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {!isLoading && !error && searchQuery.length > 2 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-md max-h-60 overflow-y-auto">
                    {isLoading && (
                        <div className="absolute z-10 w-full mt-1 text-gray-500">Loading...</div>
                    )}
                    {error && (
                        <div className="absolute z-10 w-full mt-1 text-red-500">Error fetching results</div>
                    )}
                    {data?.map((match: Ticker) => (
                        <AutocompleteItem key={match["1. symbol"]} match={match}></AutocompleteItem>
                    ))}
                </div>
            )}

        </div>
    )
}