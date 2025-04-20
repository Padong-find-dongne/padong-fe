import { create } from "zustand";

type FilterState = {
  deposit: [number, number]; // 보증금
  monthly: [number, number]; // 월세
  sale: [number, number]; // 매매
  setDeposit: (range: [number, number]) => void;
  setMonthly: (range: [number, number]) => void;
  setSale: (range: [number, number]) => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  deposit: [0, 99999],
  monthly: [0, 99999],
  sale: [0, 99999],
  setDeposit: (range) => set({ deposit: range }),
  setMonthly: (range) => set({ monthly: range }),
  setSale: (range) => set({ sale: range }),
}));
