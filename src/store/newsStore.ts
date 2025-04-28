import { create } from "zustand";
import axios from "axios";

interface News {
  newsTitle: string;
  newsSummary: string;
  newsImage: string;
}

interface NewsStore {
  newsList: News[];
  fetchNews: () => Promise<void>;
}

export const useNewsStore = create<NewsStore>((set) => ({
  newsList: [],
  fetchNews: async () => {
    try {
      const response = await axios.get("/api/news");
      set({ newsList: response.data });
    } catch (error) {
      console.error("뉴스 데이터 가져오기 실패:", error);
    }
  },
}));
