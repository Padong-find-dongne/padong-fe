import { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";

type NewsItem = {
  image: string;
  title: string;
  summary: string;
};

export default function NewsList() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // 여기에 실제 API URL 넣기
        const response = await axios.get("https//임시]");
        setNewsData(response.data);
      } catch (err) {
        setError("뉴스를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {newsData.map((news, idx) => (
        <NewsCard
          key={idx}
          image={news.image}
          title={news.title}
          summary={news.summary}
        />
      ))}
    </div>
  );
}
