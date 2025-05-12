import React, { useEffect } from "react";
import NewsCard from "../components/NewsCard";
import { useNewsStore } from "../store/newsStore";
import Header from "../components/Header";
const NewsList = () => {
  const { youthHousingNews, housingPriceNews, fetchAllNews } = useNewsStore();

  useEffect(() => {
    fetchAllNews();
  }, []);

  return (
    <div>
      <Header />
      <section className="my-5 px-20 max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">News</h1>
        <hr className="absolute left-0 w-screen border-t border-[#E5E5E5]" />
        <div className="relative z-10 mt-15">
          <span className="border-b text-xl font-bold mb-2">주택 소식</span>
          <p className="my-3 text-[#818181]">주택 정보 및 뉴스를 확인하세요.</p>
        </div>
        <div className="flex overflow-x-auto scroll-pl-6 snap-x ">
          <div className="flex w-max space-x-4">
            {youthHousingNews.map((news, index) => (
              <div
                key={index}
                className="snap-start shrink-0 w-[calc(25%-1rem)] min-w-[100px]"
              >
                <NewsCard {...news} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10">
          <span className="border-b text-xl font-bold">청년안심주택</span>
          <p className="my-3 text-[#818181]">
            서울특별시의 청년안심주택사업의 다양한 정보를 찾아보세요.
          </p>

          <div className="flex overflow-x-auto scroll-pl-6 snap-x">
            <div className="flex w-max space-x-4">
              {housingPriceNews.map((news) => (
                <div
                  key={news.originallink}
                  className="snap-start shrink-0 w-[calc(25%-1rem)] min-w-[100px]"
                >
                  <NewsCard key={news.originallink} {...news} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsList;
