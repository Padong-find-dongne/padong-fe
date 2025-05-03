import { useEffect } from "react";
import { useNewsStore } from "../store/newsStore";

interface NewsCardProps {
  search: string;
}

const NewsCard = ({ search }: NewsCardProps) => {
  const { newsList, fetchNews } = useNewsStore();

  useEffect(() => {
    fetchNews(search);
  }, [search]);

  if (newsList.length === 0) {
    return <p className="text-center text-gray-500">뉴스가 없습니다.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {newsList.map((news, index) => (
        <div key={index} className="p-4 border rounded shadow">
          <img
            src={news.newsImage}
            alt={news.newsTitle}
            className="w-full h-48 object-cover rounded mb-2"
          />
          <h3 className="text-lg font-bold">{news.newsTitle}</h3>
          <p className="text-sm text-gray-600">{news.newsSummary}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsCard;
