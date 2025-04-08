import { useSearchStore } from "../store/SearchStore";
//import { FaSearchLocation } from "react-icons/fa";

export default function SearchInput() {
  const {
    inputType,
    setInputType,
    searchValue,
    setSearchValue,
    multiSearchValues,
    setMultiSearchValue,
  } = useSearchStore();

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 선택 요소 */}
      <div className="flex my-0 space-x-9">
        <button
          className={`px-7 py-2 rounded-t-2xl ${
            inputType === "option1"
              ? "bg-[#2e58e4] text-white"
              : "bg-[#A3A3A3] text-white"
          }`}
          onClick={() => setInputType("option1")}
        >
          나 혼자 살아요
        </button>
        <button
          className={`px-7 py-2 rounded-t-2xl ${
            inputType === "option2"
              ? "bg-[#2e58e4] text-white"
              : "bg-[#A3A3A3] text-white"
          }`}
          onClick={() => setInputType("option2")}
        >
          우리 함께 살아요
        </button>
      </div>

      {/* 조건부 input 렌더링 */}

      {inputType === "option1" ? (
        <div className="w-screen max-w-md">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={"목적지(출근지,회사 등)의 지역명을 검색해보세요"}
            className="w-full pr-10 pl-4 py-2 text-sm border border-[#2e58e4] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/*<FaSearchLocation className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#2e58e4]" />*/}
        </div>
      ) : (
        <div className="w-screen max-w-md">
          {[0, 1].map((idx) => (
            <div key={idx} className="relative">
              <input
                type="text"
                value={multiSearchValues[idx]}
                onChange={(e) => setMultiSearchValue(idx, e.target.value)}
                placeholder={"목적지(출근지,회사 등)의 지역명을 검색해보세요"}
                className="w-full pr-10 pl-4 py-2 indent-14 text-sm border border-[#2e58e4] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute text-xs text-white bg-[#2e58e4] p-1 rounded-md left-3 top-1/2 transform -translate-y-1/2">{`출근지 ${
                idx + 1
              }`}</span>
              {/*<FaSearchLocation className="absolute top-1/2 transform -translate-y-1/2 text-[#2e58e4]" />*/}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
