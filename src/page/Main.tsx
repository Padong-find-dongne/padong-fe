import React from "react";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import NewsCard from "../components/NewsCard";
//import Banner1 from "../images/banner1.png";
import "../styles/Main.css";
import { BiSolidQuoteLeft } from "react-icons/bi";
const Main = () => {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center py-10 bg-[url(/images/banner1.png)]  bg-cover bg-center Banner">
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
            <button className="bg-[#2e58e4] text-white text-xs py-1 px-3 rounded-lg use-guide">
              이용가이드 &gt;
            </button>
          </div>
        </div>
      </div>
      <div className="news-list px-30 mt-20">
        <span className="text-3xl text-bold border-b">News</span>
        <div className="pt-3">
          {" "}
          <NewsCard />
        </div>
      </div>
    </div>
  );
};
export default Main;
