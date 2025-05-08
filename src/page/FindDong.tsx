import React from "react";
import { useSearchStore } from "../store/SearchStore";

import Header from "../components/Header";
const FindMap = () => {
  const { selectedRecommendation } = useSearchStore();

  return (
    <div>
      <Header />
      <div className="mt-5 ml-10 mr-10 flex flex-row space-x-10">
        <aside className="basis-1/2 w-100 flex flex-col ">
          <div>
            <div className="p-2 w-full max-w-md border rounded-lg border-[#3356CC] border-2">
              <span className="font-[600] mr-2">출근지</span>
              <span className="text-lg text-[#818181] mb-0.3 mr-5">|</span>
              <span className="text-[#818181]">
                {selectedRecommendation?.departureDong.address}
              </span>
            </div>
            <div className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold flex flex-col mt-2">
              <span className="text-[#4A6CDF]">
                {selectedRecommendation?.departureDong.address}
              </span>
              <span>행정동 정보</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FindMap;
