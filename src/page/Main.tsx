import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";
import { useNavigate } from "react-router-dom";
import { useNewsStore } from "../store/newsStore";
import "../styles/Main.css";
import { BiSolidQuoteLeft } from "react-icons/bi";

const Main: React.FC = () => {
  const { youthHousingNews, housingPriceNews, fetchAllNews } = useNewsStore();
  const navigate = useNavigate();
  const handleGuideClick = () => {
    navigate("/guide");
  };
  useEffect(() => {
    fetchAllNews();
  }, []);

  return (
    <div className="mb-20">
      <Header />
      <div className="flex items-center justify-center bg-[url(/images/banner1.png)] bg-center bg-cover Banner">
        <div className="main-search-place">
          <div className="space-y-2 flex flex-col py-12 banner-text">
            <BiSolidQuoteLeft className="text-2xl opacity-25" />
            <span className="text-[#2e58e4] text-4xl font-semibold ">
              출근길
            </span>
            <span className="text-3xl">어디서 시작하시나요 ?</span>
          </div>
          <SearchBar />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleGuideClick}
              className="bg-[#2e58e4] text-white text-xs py-1 px-3 mb-5 rounded-lg use-guide"
            >
              이용가이드 &gt;
            </button>
          </div>
        </div>
      </div>
      {/*뉴스 리스트*/}
      <div className="news-list px-30 mt-20">
        <div className="flex justify-between">
          <div className="inline-flex flex-col">
            <span className="text-3xl text-bold border-b">News</span>
            <span className="text-[#818181] mt-3">
              주택 정보 및 뉴스를 확인하세요.
            </span>
          </div>
          <span className="text-[#6D6D6D]">더보기</span>
        </div>
        <div className="mt-10 grid grid-cols-4 sm:grid-cols-2 gap-4">
          {[
            ...youthHousingNews.slice(0, 2),
            ...housingPriceNews.slice(0, 2),
          ].map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Main;
