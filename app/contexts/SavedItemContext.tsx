"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { Ticker } from "../types/types";
interface SavedItemsContextType {
    savedItems: Ticker[];
    isSaved: (symbol: string) => boolean;
    saveItem: (item: Ticker) => void;
    unsaveItem: (symbol: string) => void;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export const useSavedItems = () => {
    const context = useContext(SavedItemsContext);
    if (!context) {
        throw new Error("useSavedItems must be used within a SavedItemsProvider");
    }
    return context;
};

export const SavedItemsProvider = ({ children }: { children: React.ReactNode }) => {
    const [savedItems, setSavedItems] = useState<Ticker[]>([]);

    useEffect(() => {
        // Only set savedItems if window is defined
        if (typeof window !== "undefined") {
            const storedItems = JSON.parse(localStorage.getItem("savedItems") || "[]");
            setSavedItems(storedItems);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("savedItems", JSON.stringify(savedItems));
        }
    }, [savedItems]);

    const isSaved = (symbol: string) => savedItems.some((item) => item["1. symbol"] === symbol);

    const saveItem = (item: Ticker) => {
        if (item["1. symbol"] && !isSaved(item["1. symbol"])) {
            setSavedItems((prev) => [...prev, item]);
        }
    };

    const unsaveItem = (symbol: string) => {
        setSavedItems((prev) => prev.filter((item) => item["1. symbol"] !== symbol));
    };

    return (
        <SavedItemsContext.Provider value={{ savedItems, isSaved, saveItem, unsaveItem }}>
            {children}
        </SavedItemsContext.Provider>
    );
};