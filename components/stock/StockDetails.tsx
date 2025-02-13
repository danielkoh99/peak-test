import { StockDetails } from "@/app/types/types";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import SingleStockDetail from "./SingleStockDetail";

export function StockDetailsView({ data }: { data: StockDetails }) {
    const {
        "01. symbol": symbol,
        "08. previous close": previousClose,
        "09. change": change,
        "10. change percent": changePercent,
    } = data;

    const isPositiveChange = parseFloat(change) >= 0;
    const cleanObjectKeys = (data: StockDetails) => {
        return Object.keys(data).reduce((acc, key) => {
            const cleanKey = key.replace(/^\d+\./, "") as keyof StockDetails;
            acc[cleanKey] = data[key as keyof StockDetails];
            return acc;
        }, {} as { [key in keyof StockDetails]: string });
    };


    return (
        <div className="flex flex-1 lg:w-2/3 w-full">
            <Card className="w-full shadow-lg rounded-lg overflow-hidden">
                <CardHeader className="bg-green-500 text-white p-4">
                    <CardTitle className="text-xl font-semibold">{symbol} Stock Data</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(cleanObjectKeys(data)).map(([key, value]) => (
                            <SingleStockDetail key={key} title={key} data={value} />
                        ))}
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className={isPositiveChange ? "text-green-500" : "text-red-500"}>
                            {isPositiveChange ? (
                                <TrendingUp className="h-4 w-4 inline" />
                            ) : (
                                <TrendingDown className="h-4 w-4 inline" />
                            )}
                            <span>{changePercent}</span>
                        </div>
                        <p className="text-sm text-gray-500">{change}</p>
                    </div>
                </CardContent>
                <CardFooter className="bg-gray-100 p-4 text-center text-sm text-gray-500">
                    <p>Previous Close: {previousClose}</p>
                </CardFooter>
            </Card>
        </div>
    );
};