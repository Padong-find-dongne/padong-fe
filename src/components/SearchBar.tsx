import { useSearchStore } from "../store/SearchStore";
import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const {
    inputType,
    setInputType,
    singleDestination,
    setSingleDestination,
    multiDestinations,
    setMultiDestination,
  } = useSearchStore();
  const navigate = useNavigate();
  // inputType에 따라 다르게 렌더링되는 input의 value를 설정하는 함수
  const handleInputChange = (index: number, value: string) => {
    const newDong = { dongName: value, dongCode: "" };
    setMultiDestination(index, newDong);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate("/search");
    }
  }; // Added missing closing brace here
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 선택 요소 */}
      <div className="flex my-0 space-x-9">
        <button
          className={`px-9 py-2 rounded-t-2xl ${
            inputType === "option1"
              ? "bg-[#2e58e4] text-white"
              : "bg-[#A3A3A3] text-white"
          }`}
          onClick={() => setInputType("option1")}
        >
          나 혼자 살아요
        </button>
        <button
          className={`px-9 py-2 rounded-t-2xl ${
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
        <div className="relative items-center w-screen max-w-md">
          <input
            type="text"
            value={singleDestination?.dongName || ""}
            onChange={(e) =>
              setSingleDestination({ dongName: e.target.value, dongCode: "" })
            }
            onKeyDown={handleKeyPress}
            placeholder={"목적지(출근지,회사 등)의 지역명을 검색해보세요"}
            className=" w-full pr-10 pl-4 py-2 text-sm border border-[#2e58e4] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute top-1 right-3 p-1.5 text-[#2e58e4] rounded-full">
            <GrSearch
              className="text-lg cursor-pointer"
              onClick={() => {
                navigate("/search");
              }}
            />
          </div>
        </div>
      ) : (
        <div className="relative w-screen max-w-md border rounded-lg border-[#2e58e4]">
          {[0, 1].map((idx) => (
            <div key={idx} className="border-b border-gray-300 relative">
              <input
                type="text"
                value={multiDestinations[idx]?.dongName || ""}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={"목적지(출근지,회사 등)의 지역명을 검색해보세요"}
                className="border-none w-full pr-10 pl-4 py-2 indent-14 text-sm border border-[#2e58e4] rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
              <span className="absolute text-xs text-white bg-[#2e58e4] p-1 rounded-md left-3 top-1/2 transform -translate-y-1/2">{`출근지 ${
                idx + 1
              }`}</span>
            </div>
          ))}

          <div className="absolute top-5 right-3 p-1.5 bg-[#2e58e4] text-[#FFFFFF] rounded-full">
            <GrSearch
              className="text-lg cursor-pointer"
              onClick={() => {
                navigate("/search");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchBar;
