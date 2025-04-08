import { create } from "zustand";

type SearchStore = {
  inputType: string;
  setInputType: (type: string) => void;

  searchValue: string;
  setSearchValue: (value: string) => void;

  multiSearchValues: [string, string];
  setMultiSearchValue: (index: number, value: string) => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
  inputType: "option1",
  setInputType: (type) => set({ inputType: type }),

  searchValue: "",
  setSearchValue: (value) => set({ searchValue: value }),

  multiSearchValues: ["", ""],
  setMultiSearchValue: (index, value) =>
    set((state) => {
      const updatedValues = [...state.multiSearchValues];
      updatedValues[index] = value;
      return { multiSearchValues: updatedValues as [string, string] };
    }),
}));
