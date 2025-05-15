import { create } from "zustand";
import debounce from "lodash/debounce";
import axios from "axios";

type AutoStore = {
  query: string;
  suggestions: string[];
  setQuery: (q: string) => void;
  fetchSuggestions: (q: string) => void;
  clear: () => void;
};

export const useAutoStore = create<AutoStore>((set) => {
  const debouncedFetch = debounce(async (q: string) => {
    if (!q.trim()) {
      set({ suggestions: [] });
      return;
    }

    try {
      const res = await axios.get(
        `https://padong.site/open-search/keyword?keyword=${encodeURIComponent(
          q
        )}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = res.data;

      console.log("서버 응답 데이터:", data);

      if (Array.isArray(data)) {
        set({ suggestions: data });
      } else {
        set({ suggestions: [] });
      }
    } catch (error) {
      console.error("자동완성 에러:", error);
      set({ suggestions: [] });
    }
  }, 300);

  return {
    query: "",
    suggestions: [],
    setQuery: (q) => {
      set({ query: q });
      debouncedFetch(q);
    },
    fetchSuggestions: debouncedFetch,
    clear: () => set({ suggestions: [] }),
  };
});
