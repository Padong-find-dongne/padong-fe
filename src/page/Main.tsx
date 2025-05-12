import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";
import { useNavigate } from "react-router-dom";
import { useNewsStore } from "../store/newsStore";
import "../styles/Media.css";
import { BiSolidQuoteLeft } from "react-icons/bi";
import LoadingSpinner from "../components/LoadingSpinner";

const Main: React.FC = () => {
  const { youthHousingNews, housingPriceNews, fetchAllNews } = useNewsStore();
  const navigate = useNavigate();
  // 페이지 이동
  const handleGuideClick = () => {
    navigate("/guide");
  };
  const handleNewsClick = () => {
    navigate("/news-list");
  };
  const [isLoading, setIsLoading] = React.useState(true);
  //뉴스 렌더링

  // 뉴스 렌더링
  useEffect(() => {
    const loadData = async () => {
      await fetchAllNews();
      setIsLoading(false); // 데이터 로딩 완료 후 로딩 상태 false
    };
    loadData();
  }, [fetchAllNews]);
  return (
    <div className="mb-20">
      <Header />
      <div className="flex items-center justify-center bg-[url(/images/banner1.png)] bg-center bg-cover Banner">
        <div className="main-search-place">
          <div className="space-y-2 flex flex-col align-center justify-center py-12 banner-text">
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
      <div className="news-list m-20 px-5">
        <div className="flex justify-between">
          <div className="inline-flex flex-col">
            <span className="text-3xl font-bold border-b">News</span>
            <span className="text-[#818181] mt-3">
              주택 정보 및 뉴스를 확인하세요.
            </span>
          </div>
          <span onClick={handleNewsClick} className="text-[#6D6D6D]">
            더보기
          </span>
        </div>
        {isLoading ? (
          <LoadingSpinner loadingMent="뉴스를 불러오는 중입니다" />
        ) : (
          <div className="news-grid mt-10 grid grid-cols-4 gap-4">
            {[
              ...youthHousingNews.slice(0, 2),
              ...housingPriceNews.slice(0, 2),
            ].map((item, index) => (
              <NewsCard
                key={index}
                newsTitle={item.newsTitle}
                newsSummary={item.newsSummary}
                newsImage={item.newsImage}
                originallink={item.originallink}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Main;
