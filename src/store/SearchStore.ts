import { create } from "zustand";

//공통  타입
export type DepartureDong = {
  adminDongCode: string;
  address: string;
};
//추천 행정동 리스트
export type Recommendation = {
  departureDong: DepartureDong;
  score: number;
  totalMobility: number;
  avgTime: number;
  density: number;
  safety: number;
  avgJeonseDeposit: number;
  avgMonthlyDeposit: number;
  avgMonthlyRent: number;
  totalMobility1?: number;
  totalMobility2?: number;
  avgTime1?: number;
  avgTime2?: number;
};

type Destination = {
  dongName: string;
  dongCode: string;
};

//mobility 옵션
export type MobilityOption =
  | "firstMobility"
  | "secondMobility"
  | "intersectedMobility";
type InputType = "option1" | "option2";

interface SearchState {
  inputType: InputType;
  setInputType: (type: InputType) => void;

  singleDestination: Destination;
  setSingleDestination: (d: Destination) => void;

  // MultiDestinations을 각각 개별적으로 관리 (refactor 할 떄, 배열로 관리해보는 것도 좋을듯)
  multiAddress1: Destination;
  setMultiAddress1: (d: Destination) => void;

  multiAddress2: Destination;
  setMultiAddress2: (d: Destination) => void;

  recommendations: Recommendation[];
  setRecommendations: (data: Recommendation[]) => void;
  boundaryData: any;
  setBoundaryData: (data: any) => void;

  selectedRecommendation: Recommendation | null;
  setSelectedRecommendation: (rec: Recommendation) => void;
  firstMobility: Recommendation[];
  setFirstMobility: (data: Recommendation[]) => void;
  secondMobility: Recommendation[];
  setSecondMobility: (data: Recommendation[]) => void;
  intersectedMobility: Recommendation[];
  setIntersectedMobility: (data: Recommendation[]) => void;
  moblilityOption: MobilityOption;
  setMobilityOption: (option: MobilityOption) => void;
  setMobilityData: (data: {
    firstMobility: Recommendation[];
    secondMobility: Recommendation[];
    intersectedMobility: Recommendation[];
  }) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  inputType: "option1",
  setInputType: (type) => set({ inputType: type }),

  singleDestination: { dongName: "", dongCode: "" },
  setSingleDestination: (d) => set({ singleDestination: d }),
  multiAddress1: { dongName: "", dongCode: "" },
  setMultiAddress1: (d) => set({ multiAddress1: d }),

  multiAddress2: { dongName: "", dongCode: "" },
  setMultiAddress2: (d) => set({ multiAddress2: d }),
  boundaryData: null,
  setBoundaryData: (data) => set({ boundaryData: data }),
  // 추천 행정동 리스트
  recommendations: [],
  setRecommendations: (data) => set({ recommendations: data }),
  selectedRecommendation: null,
  setSelectedRecommendation: (data) => set({ selectedRecommendation: data }),
  //멀티 인풋 관리
  firstMobility: [],
  setFirstMobility: (data) => set({ firstMobility: data }),
  secondMobility: [],
  setSecondMobility: (data) => set({ secondMobility: data }),
  intersectedMobility: [],
  setIntersectedMobility: (data) => set({ intersectedMobility: data }),
  moblilityOption: "firstMobility",
  setMobilityOption: (option) => set({ moblilityOption: option }),
  setMobilityData: (data) => set(data),
}));
