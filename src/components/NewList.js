import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
export default function NewsList() {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchNews = async () => {
            try {
                // 여기에 실제 API URL 넣기
                const response = await axios.get("https//임시]");
                setNewsData(response.data);
            }
            catch (err) {
                setError("뉴스를 불러오는 데 실패했습니다.");
            }
            finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);
    if (loading)
        return _jsx("p", { children: "\uB85C\uB529 \uC911..." });
    if (error)
        return _jsx("p", { children: error });
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4", children: newsData.map((news, idx) => (_jsx(NewsCard, { newsImage: news.newsImage, newsTitle: news.newsTitle, newsSummary: news.newsSummary }, idx))) }));
}
