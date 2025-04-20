import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";
import { useNavigate } from "react-router-dom";
import "../styles/Main.css";
import { BiSolidQuoteLeft } from "react-icons/bi";
const Main = () => {
  const navigate = useNavigate();

  const handleGuideClick = () => {
    navigate("/guide");
  };

  return (
    <div>
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
      <div className="news-list px-30 mt-20">
        <span className="text-3xl text-bold border-b">News</span>
        <p className="text-[#818181] mt-3">주택 정보 및 뉴스를 확인하세요.</p>
        <div className="pt-3">
          <NewsCard />
        </div>
      </div>
    </div>
  );
};
export default Main;
