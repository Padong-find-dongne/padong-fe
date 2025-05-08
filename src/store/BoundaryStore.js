import { create } from "zustand";
import axios from "axios";
export const useBoundaryStore = create((set, get) => ({
    boundaries: {},
    fetchBoundary: async (adminDongCode) => {
        const existing = get().boundaries[adminDongCode];
        if (existing)
            return existing;
        try {
            const res = await axios.get(`/api/boundary/${adminDongCode}`);
            const data = res.data?.data ?? null;
            if (data) {
                set((state) => ({
                    boundaries: {
                        ...state.boundaries,
                        [adminDongCode]: data,
                    },
                }));
            }
            return data;
        }
        catch (err) {
            console.error("경계 데이터를 불러오는 중 오류 발생:", err);
            return null;
        }
    },
    clearBoundaries: () => set({ boundaries: {} }),
}));
