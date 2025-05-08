// src/store/newsStore.ts
import { create } from "zustand";
import axios from "axios";
export const useNewsStore = create((set) => ({
    youthHousingNews: [],
    housingPriceNews: [],
    fetchAllNews: async () => {
        try {
            const [youthRes, priceRes] = await Promise.all([
                axios.get(`/api/news/search/house-price`),
                axios.get(`/api/news/search/youth-house`),
            ]);
            const mapItems = (items) => items.map((item) => ({
                newsTitle: item.title,
                newsSummary: item.description,
                originallink: item.originallink,
                newsImage: item.thumbnail,
            }));
            set({
                youthHousingNews: mapItems(youthRes.data.data.items),
                housingPriceNews: mapItems(priceRes.data.data.items),
            });
        }
        catch (error) {
            console.error("뉴스 불러오기 실패:", error);
        }
    },
}));
