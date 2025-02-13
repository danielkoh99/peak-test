interface SearchTickerRes {
    bestMatches?: Ticker[]
    "Information"?: string
}
interface Ticker {
    "1. symbol": string,
    "2. name": string,
    "3. type": string,
    "4. region": string,
    "5. marketOpen": string,
    "6. marketClose": string,
    "7. timezone": string,
    "8. currency": string,
    "9. matchScore": string,
}
interface StockDetailsRes {
    "Global Quote": StockDetails
    "Information"?: string
}
interface StockDetails {
    "01. symbol": string,
    "02. open": string,
    "03. high": string,
    "04. low": string,
    "05. price": string,
    "06. volume": string
    "07. latest trading day": string
    "08. previous close": string
    "09. change": string
    "10. change percent": string
}
interface StockMetaData {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Time Zone": string;
};

interface StockTimeSeriesEntry {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
};

interface StockData {
    "Meta Data": StockMetaData;
    "Monthly Time Series": Record<string, StockTimeSeriesEntry>;
    "Information"?: string
};

export type { SearchTickerRes, Ticker, StockDetails, StockData, StockDetailsRes }