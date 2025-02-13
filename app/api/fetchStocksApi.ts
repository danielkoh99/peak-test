import { apiRequest } from "@/lib/axiosInstance"

export const fetchTickerSearchResults = async<T>(symbol: string) => {
    const response = await apiRequest<T>({
        url: `/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    })
    return response.response?.data as T
}