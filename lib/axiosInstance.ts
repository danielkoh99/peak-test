import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Set up an Axios instance
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiRequestProps {
    url: string;
    method?: Method;
    data?: unknown;
    config?: AxiosRequestConfig;
    timeout?: number;
}

interface ApiResponse<T> {
    response: AxiosResponse<T> | null;
    error: unknown;
    loading: boolean;
}

export const apiRequest = async <T = unknown>({
    url,
    method = "GET",
    data = null,
    config = {},
    timeout = 5000,
}: ApiRequestProps): Promise<ApiResponse<T>> => {
    let response: AxiosResponse<T> | null = null;
    let error: unknown = null;
    let loading = true;

    try {
        const axiosConfig: AxiosRequestConfig = {
            method,
            url,
            timeout,
            headers: {
                "Content-Type": "application/json",
                ...config?.headers,
            },
            ...(data ? { data } : {}),
            ...(config?.params ? { params: config.params } : {}),
        };

        response = await api(axiosConfig);
    } catch (err) {
        error = err;
    } finally {
        loading = false;
    }

    return { response, error, loading };
};