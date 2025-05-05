import { useEffect } from "react";
import { useNewsStore } from "../store/newsStore";
import NewsCard from "../components/NewsCard";

interface NewsListProps {
  search: string;
}

const NewsList = ({ search }: NewsListProps) => {
  const { newsList, fetchNews } = useNewsStore();

  useEffect(() => {
    fetchNews(search);
  }, [search]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsList.length === 0 ? (
        <p className="text-center col-span-full text-gray-500">
          뉴스가 없습니다.
        </p>
      ) : (
        newsList.map((news, index) => (
          <NewsCard
            key={index}
            newsTitle={news.newsTitle}
            newsSummary={news.newsSummary}
            newsImage={news.newsImage}
          />
        ))
      )}
    </div>
  );
};

export default NewsList;
