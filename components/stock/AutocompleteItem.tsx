import { Ticker } from "@/app/types/types";
import Link from "next/link";

export default function AutocompleteItem({ match }: { match: Ticker }) {
    return (
        <Link href={`/stock/${match["1. symbol"]}`}>
            <div className="p-2 cursor-pointer hover:bg-gray-100">
                <div className="text-sm font-semibold">{match["1. symbol"]}</div>
                <div className="text-xs text-gray-500">{match["2. name"]}</div>
                <div className="text-xs text-gray-500">{match["8. currency"]}</div>
            </div></Link>
    )
}