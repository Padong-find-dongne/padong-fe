import { create } from "zustand";

type Dong = {
  dongName: string;
  dongCode: string;
};

type SearchStore = {
  inputType: string;
  setInputType: (type: string) => void;

  // option1용
  singleDestination: Dong | null;
  setSingleDestination: (dong: Dong | null) => void;

  // option2용
  multiDestinations: [Dong | null, Dong | null];
  setMultiDestination: (index: number, dong: Dong | null) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  inputType: "option1",
  setInputType: (type) => set({ inputType: type }),

  singleDestination: null,
  setSingleDestination: (dong) => set({ singleDestination: dong || null }),

  multiDestinations: [null, null],
  setMultiDestination: (index, dong) =>
    set((state) => {
      const updated = [...state.multiDestinations] as [
        Dong | null,
        Dong | null
      ];
      updated[index] = dong || null;
      return { multiDestinations: updated };
    }),
}));
