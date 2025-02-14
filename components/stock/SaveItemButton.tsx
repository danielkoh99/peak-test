import { useSavedItems } from '@/app/contexts/SavedItemContext';
import { Ticker } from '@/app/types/types';
import { StarIcon } from 'lucide-react';
import React from 'react'

export default function SaveItemButton({ item }: { item: Ticker }) {
    const { isSaved, unsaveItem, saveItem } = useSavedItems();
    const saved = isSaved(item["1. symbol"])
    const handleSaveItem = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (saved) {
            unsaveItem(item["1. symbol"])
        } else {
            saveItem(item)
        }
    }
    return (
        <button onClick={handleSaveItem} className="ml-2 p-4">
            <StarIcon
                className={`w-5 h-5 cursor-pointer transition-all ${saved ? "fill-yellow-500 text-yellow-500" : "text-gray-400 hover:fill-yellow-500"
                    }`}
            />
        </button>
    )
}
