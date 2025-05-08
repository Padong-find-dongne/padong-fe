export type Recommendation = {
    departureDong: {
        adminDongCode: string;
        address: string;
    };
    score: number;
    totalMobility: number;
    avgTime: number;
    density: number;
    safety: number;
    avgJeonseDeposit: number;
    avgMonthlyDeposit: number;
    avgMonthlyRent: number;
};
type Destination = {
    dongName: string;
    dongCode: string;
};
type InputType = "option1" | "option2";
interface SearchState {
    inputType: InputType;
    setInputType: (type: InputType) => void;
    singleDestination: Destination;
    setSingleDestination: (d: Destination) => void;
    multiDestinations: Destination[];
    setMultiDestination: (index: number, d: Destination) => void;
    recommendations: Recommendation[];
    setRecommendations: (data: Recommendation[]) => void;
    boundaryData: any;
    setBoundaryData: (data: any) => void;
    selectedRecommendation: Recommendation | null;
    setSelectedRecommendation: (rec: Recommendation) => void;
}
export declare const useSearchStore: import("zustand").UseBoundStore<import("zustand").StoreApi<SearchState>>;
export {};
