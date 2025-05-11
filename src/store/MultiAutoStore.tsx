import { create } from "zustand";
import debounce from "lodash/debounce";

type MultiAutoStore = {
  queries: string[]; // 각 입력의 쿼리 값 저장
  multiSuggestions: string[][]; // 각 입력에 대한 자동완성 목록
  setMultiSuggestions: (idx: number, list: string[]) => void; // 자동완성 목록 설정 함수
  setMultiQuery: (index: number, q: string) => void; // 쿼리 값 설정 함수
  fetchMultiSuggestions: (index: number, q: string) => void; // 자동완성 리스트 가져오는 함수
  clearSuggestions: (idx?: number) => void; // 자동완성 목록 초기화
};

export const useMultiAutoStore = create<MultiAutoStore>((set, get) => {
  const debouncedFetch = debounce(async (index: number, q: string) => {
    if (!q.trim()) {
      const newSuggestions = [...get().multiSuggestions];
      newSuggestions[index] = [];
      set({ multiSuggestions: newSuggestions });
      return;
    }

    try {
      const res = await fetch(
        `https://padong.site/open-search/keyword?keyword=${encodeURIComponent(
          q
        )}`,
        { method: "GET", headers: { Accept: "application/json" } }
      );
      const data = await res.json();
      const newSuggestions = [...get().multiSuggestions];
      newSuggestions[index] = Array.isArray(data) ? data : [];
      set({ multiSuggestions: newSuggestions });
    } catch (error) {
      console.error("자동완성 에러:", error);
    }
  }, 300);

  return {
    queries: ["", ""], // 각 인풋의 쿼리 값을 저장하는 배열
    multiSuggestions: [[], []], // 각 인풋에 대한 자동완성 리스트
    setMultiQuery: (index, q) => {
      const newQueries = [...get().queries];
      newQueries[index] = q;
      set({ queries: newQueries });
      get().fetchMultiSuggestions(index, q); // 쿼리 값 변경 시 자동완성 리스트 fetch
    },
    fetchMultiSuggestions: debouncedFetch, // 자동완성 fetch 함수
    clearSuggestions: () => set({ multiSuggestions: [[], []] }), // 자동완성 초기화
    setMultiSuggestions: (idx: number, list: string[]) => {
      const newSuggestions = [...get().multiSuggestions];
      newSuggestions[idx] = list;
      set({ multiSuggestions: newSuggestions });
    },
  };
});
