import { create } from "zustand";
export const useSearchStore = create((set) => ({
    inputType: "option1",
    setInputType: (type) => set({ inputType: type }),
    singleDestination: { dongName: "", dongCode: "" },
    setSingleDestination: (d) => set({ singleDestination: d }),
    multiDestinations: [
        { dongName: "", dongCode: "" },
        { dongName: "", dongCode: "" },
    ],
    setMultiDestination: (index, d) => set((state) => {
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
