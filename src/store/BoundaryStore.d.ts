interface BoundaryStore {
    boundaries: Record<string, any>;
    fetchBoundary: (adminDongCode: string) => Promise<any | null>;
    clearBoundaries: () => void;
}
export declare const useBoundaryStore: import("zustand").UseBoundStore<import("zustand").StoreApi<BoundaryStore>>;
export {};
