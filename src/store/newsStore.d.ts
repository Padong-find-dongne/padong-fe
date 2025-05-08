export interface NewsItem {
    newsTitle: string;
    newsSummary: string;
    originallink: string;
    newsImage: string;
}
interface NewsStore {
    youthHousingNews: NewsItem[];
    housingPriceNews: NewsItem[];
    fetchAllNews: () => Promise<void>;
}
export declare const useNewsStore: import("zustand").UseBoundStore<import("zustand").StoreApi<NewsStore>>;
export {};
