// src/store/newsStore.ts
import { create } from "zustand";
import axios from "axios";

export interface NewsItem {
  newsTitle: string;
  newsSummary: string;
  originallink: string;
  newsImage: string;
}

interface NewsStore {
  youthHousingNews: NewsItem[];
  housingPriceNews: NewsItem[];
  fetchAllNews: () => Promise<void>;
}
export const useNewsStore = create<NewsStore>((set) => ({
  youthHousingNews: [],
  housingPriceNews: [],
  fetchAllNews: async () => {
    try {
      const [youthRes, priceRes] = await Promise.all([
        axios.get(`https://padong.site/news/search/house-price`),
        axios.get(`https://padong.site/news/search/youth-house`),
      ]);

      const mapItems = (items: any[]): NewsItem[] =>
        items.map((item) => ({
          newsTitle: item.title,
          newsSummary: item.description,
          newsImage: item.thumbnail,
          originallink: item.originallink || "", // 없으면 빈 문자열로 설정
        }));

      set({
        youthHousingNews: mapItems(youthRes.data.data.items),
        housingPriceNews: mapItems(priceRes.data.data.items),
      });
    } catch (error) {
      console.error("뉴스 불러오기 실패:", error);
    }
  },
}));
