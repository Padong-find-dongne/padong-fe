import React from "react";
interface NewsCardProps {
    newsTitle: string;
    newsSummary: string;
    newsImage: string;
}
declare const NewsCard: React.FC<NewsCardProps>;
export default NewsCard;
