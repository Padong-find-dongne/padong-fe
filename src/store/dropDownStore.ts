import { create } from "zustand";

type DropdownType = "dealType" | "price" | "roomSize" | "extraFilter" | null;

interface DropdownStore {
  openDropdown: DropdownType;
  setOpenDropdown: (dropdown: DropdownType) => void;
}

export const useDropdownStore = create<DropdownStore>((set) => ({
  openDropdown: null,
  setOpenDropdown: (dropdown) =>
    set((state) => ({
      openDropdown: state.openDropdown === dropdown ? null : dropdown,
    })),
}));
