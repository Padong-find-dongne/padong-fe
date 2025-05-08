type AutoStore = {
    query: string;
    suggestions: string[];
    setQuery: (q: string) => void;
    fetchSuggestions: (q: string) => void;
    clear: () => void;
};
export declare const useAutoStore: import("zustand").UseBoundStore<import("zustand").StoreApi<AutoStore>>;
export {};
