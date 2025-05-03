import { create } from "zustand";
import axios from "axios";

interface News {
  newsTitle: string;
  newsSummary: string;
  newsImage: string;
}

interface NewsStore {
  newsList: News[];
  fetchNews: (search: string) => Promise<void>;
}

export const useNewsStore = create<NewsStore>((set) => ({
  newsList: [],
  fetchNews: async (search: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/news/${encodeURIComponent(search)}`
      );
      console.log("전체 응답:", response);
      console.log("response.data:", response.data);

      const items = response.data?.data?.items;
      if (!items || !Array.isArray(items)) {
        console.warn("뉴스 응답에 items가 없습니다.");
        return;
      }

      const formattedNews = items.map((item: any) => ({
        newsTitle: item.title,
        newsSummary: item.description,
        newsImage: item.thumbnail,
      }));

      set({ newsList: formattedNews });
    } catch (error) {
      console.error("뉴스 데이터 가져오기 실패:", error);
    }
  },
}));
