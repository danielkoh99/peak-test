"use client";
import { Ticker } from "@/app/types/types";
import Link from "next/link";
import SaveItemButton from "./SaveItemButton";

export default function SingleTickerItem({ match }: { match: Ticker }) {
    return (
        <div className="flex w-full items-center justify-between p-2 border-b hover:bg-gray-100">
            <Link href={`/stock/${match["1. symbol"]}`} className="flex w-full ">
                <div className="flex flex-col text-start">
                    <h3 className="font-semibold">{match["1. symbol"]}</h3>
                    <p className="text-sm text-gray-600">{match["2. name"]}</p>
                    <p className="text-sm text-gray-600">{match["8. currency"]}</p>
                </div>
            </Link>
            <SaveItemButton item={match} />
        </div>
    );
}