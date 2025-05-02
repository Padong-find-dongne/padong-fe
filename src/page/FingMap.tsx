import React from "react";
import { useSearchStore } from "../store/SearchStore";
import SeoulMap from "../components/SeoulMap";

const FingMap = () => {
  const { singleDestination, multiDestinations, inputType } = useSearchStore();
  return (
    <div className="mt-5 ml-5">
      <aside className="w-100 flex flex-col ">
        {/*inputType에 따라 다르게 렌더링*/}
        {inputType === "option1" ? (
          <div className="p-2 w-full max-w-md border rounded-lg border-[#3356CC] border-2">
            <span className="font-[600] mr-2">출근지</span>
            <span className="text-lg text-[#818181] mb-0.3 mr-5">|</span>
            <span className="text-[#818181]">
              {singleDestination?.dongName || ""}
            </span>
          </div>
        ) : (
          <div className="p-2 w-full max-w-md border rounded-lg border-[#3356CC] border-2">
            <div className="border-b border-gray-200">
              <span className="font-[600] mr-2">출근지1</span>
              <span className="text-lg text-[#818181] mb-0.3 mr-5">|</span>
              <span className="text-[#818181]">
                {multiDestinations[0]?.dongName || ""}
              </span>
            </div>
            <div>
              <span className="font-[600] mr-2">출근지2</span>
              <span className="text-lg text-[#818181] mb-0.3 mr-5">|</span>
              <span className="text-[#818181]">
                {multiDestinations[1]?.dongName || ""}
              </span>
            </div>
          </div>
        )}
      </aside>
      <SeoulMap />
    </div>
  );
};

export default FingMap;
