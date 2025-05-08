import { create } from "zustand";

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
}));
