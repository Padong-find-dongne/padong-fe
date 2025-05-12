import React from "react";
import type { NewsItem } from "../store/newsStore";

interface NewsCardProps extends NewsItem {}

const NewsCard: React.FC<NewsCardProps> = ({
  newsTitle,
  newsSummary,
  newsImage,
  originallink,
}) => {
  const handleNewsClick = () => {
    window.open(originallink, "_blank");
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      onClick={handleNewsClick}
    >
      <div className="p-4 rounded">
        <img
          src={newsImage}
          alt={newsTitle}
          className="w-full h-48 object-cover rounded mb-2"
        />
        <h3 className="text-lg font-bold">{newsTitle}</h3>
        <p className="text-sm text-gray-600">{newsSummary}</p>
      </div>
    </div>
  );
};

export default NewsCard;
