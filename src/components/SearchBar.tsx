import { useSearchStore } from "../store/SearchStore";
import { useAutoStore } from "../store/AutoStore";
import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import AutoList from "./AutoList";
import axios from "axios";

const SearchBar = () => {
  const { setQuery, fetchSuggestions } = useAutoStore();
  //SearchStore 상태
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

    setQuery(value); // 자동완성 검색어 상태 설정
    fetchSuggestions(value);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleNext();
      navigate("/search");
    }
  };

  // 목적지 서버로 보내기
  const searchClick = async () => {
    try {
      const response = await axios.get(`/api/mobility/address`, {
        data: inputType === "option1" ? singleDestination : multiDestinations,
      });
      console.log("목적지 응답:", response.data);
      navigate("/search");
    } catch (error) {
      console.error("목적지 요청 오류:", error);
    }
  };
  //행정동 코드 요청
  const fetchAdminDongCode = async (address: string) => {
    try {
      const response = await fetch(
        `http://3.39.234.97:8080/mobility/address?address=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();

      if (data?.data?.[0]?.departureDong?.adminDongCode) {
        return data.data[0].departureDong.adminDongCode;
      } else {
        throw new Error("행정동 코드가 없습니다.");
      }
    } catch (error) {
      console.error("Error fetching adminDongCode:", error);
      return null;
    }
  };
  const handleNext = async () => {
    if (!singleDestination) {
      alert("주소를 선택해주세요!");
      return;
    }

    const adminDongCode = await fetchAdminDongCode(singleDestination.dongName);

    if (!adminDongCode) {
      alert("행정동 코드를 찾을 수 없습니다.");
      return;
    }

    const boundaryPoints = await fetchBoundary(adminDongCode);
    console.log("경계 좌표:", boundaryPoints);
  };
  const fetchBoundary = async (adminDongCode: string) => {
    try {
      const response = await fetch(
        `http://3.39.234.97:8080/boundarty?geocode=${encodeURIComponent(
          adminDongCode
        )}`
      );
      const data = await response.json();
      if (data && data.data) {
        return data.data;
      } else {
        throw new Error("경계 좌표를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error fetching boundary:", error);

      return null;
    }
  };

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
            onChange={(e) => {
              const q = e.target.value;
              setSingleDestination({ dongName: q, dongCode: "" });

              setQuery(q);
              fetchSuggestions(q); // lodash debounce로 서버 요청
            }}
            onKeyDown={handleKeyPress}
            placeholder={"목적지(출근지,회사 등)의 지역명을 검색해보세요"}
            className=" w-full pr-10 pl-4 py-2 text-sm border border-[#2e58e4] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute top-1 right-3 p-1.5 text-[#2e58e4] rounded-full">
            <GrSearch className="text-lg cursor-pointer" onClick={handleNext} />
          </div>
          {/* 자동완성 리스트 */}
          <AutoList
            onSelect={(dong) => {
              setSingleDestination({ dongName: dong, dongCode: "" });
            }}
          />
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
            <GrSearch className="text-lg cursor-pointer" onClick={handleNext} />
          </div>
          {/* 자동완성 리스트 */}
          <AutoList
            onSelect={(dong) => {
              setMultiDestination(idx, dong);
            }}
          />
        </div>
      )}
    </div>
  );
};
export default SearchBar;
