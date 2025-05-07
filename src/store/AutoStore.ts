import { create } from "zustand";
import debounce from "lodash/debounce";

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
      const res = await fetch(
        `/api/open-search/keyword?keyword=${encodeURIComponent(q)}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json", // 서버에 JSON 응답을 요청
          },
        }
      );

      if (!res.ok) {
        throw new Error(`API 요청 실패: ${res.statusText}`);
      }

      const data = await res.json();

      // 응답 데이터 로그 출력
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
