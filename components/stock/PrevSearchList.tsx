import { SearchTickerRes } from "@/app/types/types";
import Link from "next/link";


export default function StockList({ data }: { data: SearchTickerRes['bestMatches'] }) {
    if (!data || data?.length === 0) return (
        <p className="text-lg font-semibold">No previous search results</p>
    )
    return (
        <div className="flex flex-col gap-4">
            <p className="text-lg font-semibold w-full text-center">Previous search results</p>
            <div className="flex flex-wrap gap-4 w-full justify-center max-h-72 overflow-y-auto">
                {data?.map((stock) => (
                    <Link key={stock["1. symbol"]} href={`/stock/${stock["1. symbol"]}`} passHref>
                        <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-100 transition w-[180px] h-[120px]">
                            <h3 className="font-semibold">{stock["1. symbol"]}</h3>
                            <p className="text-sm text-gray-600 text-center">{stock["2. name"]}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}