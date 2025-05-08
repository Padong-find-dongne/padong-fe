import { create } from "zustand";
//추천 행정동 리스트
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
  boundaryData: any; // 실제 타입이 있다면 any 대신 사용
  setBoundaryData: (data: any) => void;

  selectedRecommendation: Recommendation | null;
  setSelectedRecommendation: (rec: Recommendation) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  inputType: "option1",
  setInputType: (type) => set({ inputType: type }),

  singleDestination: { dongName: "", dongCode: "" },
  setSingleDestination: (d) => set({ singleDestination: d }),

  multiDestinations: [
    { dongName: "", dongCode: "" },
    { dongName: "", dongCode: "" },
  ],
  setMultiDestination: (index, d) =>
    set((state) => {
      const updated = [...state.multiDestinations];
      updated[index] = d;
      return { multiDestinations: updated };
    }),
  boundaryData: null,
  setBoundaryData: (data) => set({ boundaryData: data }),
  // 추천 행정동 리스트
  recommendations: [],
  setRecommendations: (data) => set({ recommendations: data }),
  selectedRecommendation: null,
  setSelectedRecommendation: (data) => set({ selectedRecommendation: data }),
}));
