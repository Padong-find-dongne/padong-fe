import { useSearchStore } from "../store/SearchStore";
import { useAutoStore } from "../store/AutoStore";
import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBoundaryStore } from "../store/BoundaryStore";
const SearchBar = () => {
  const {
    inputType,
    setInputType,
    singleDestination,
    setSingleDestination,
    multiDestinations,
    setMultiDestination,
  } = useSearchStore();

  // 상단 선언
  const { fetchBoundary } = useBoundaryStore();
  const { suggestions, setQuery, fetchSuggestions, clear } = useAutoStore();
  const navigate = useNavigate();

  const handleInputChange = (index: number, value: string) => {
    setMultiDestination(index, { dongName: value, dongCode: "" });
    setQuery(value);
    fetchSuggestions(value);
  };

  const fetchSingleAdminDongCode = async (dongName: string) => {
    try {
      const res = await fetch(
        `/api/mobility/address?address=${encodeURIComponent(dongName)}`
      );
      const data = await res.json();
      return data?.data?.[0]?.departureDong?.adminDongCode ?? null;
    } catch {
      return null;
    }
  };

  const fetchMultiAdminDongCodes = async (addr1: string, addr2: string) => {
    try {
      const res = await fetch(
        `/api/mobility/address/multi?address1=${encodeURIComponent(
          addr1
        )}&address2=${encodeURIComponent(addr2)}&page=0`
      );
      const data = await res.json();
      const code1 =
        data?.data?.firstMobility?.[0]?.departureDong?.adminDongCode;
      const code2 =
        data?.data?.secondMobility?.[0]?.departureDong?.adminDongCode;
      return code1 && code2 ? [code1, code2] : null;
    } catch {
      return null;
    }
  };

  const handleSelect = async (dongName: string, index: number = 0) => {
    const dongCode = await fetchSingleAdminDongCode(dongName);
    if (!dongCode) return;

    if (inputType === "option1") {
      setSingleDestination({ dongName, dongCode });
    } else {
      setMultiDestination(index, { dongName, dongCode });
    }

    clear();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNext();
      navigate("/search");
    }
  };

  const handleNext = async () => {
    navigate("/search");
    if (inputType === "option1") {
      const code =
        singleDestination.dongCode ||
        (await fetchSingleAdminDongCode(singleDestination.dongName));
      if (!code) return alert("행정동 코드를 찾을 수 없습니다.");
      const boundary = await fetchBoundary(code);

      console.log("경계 좌표:", boundary);
    } else {
      const [addr1, addr2] = multiDestinations.map((d) => d.dongName);
      const codes = await fetchMultiAdminDongCodes(addr1, addr2);
      if (!codes) return alert("두 개의 행정동 코드를 찾을 수 없습니다.");
      const [b1, b2] = await Promise.all([
        fetchBoundary(codes[0]),
        fetchBoundary(codes[1]),
      ]);
      console.log("경계1:", b1);
      console.log("경계2:", b2);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex my-0 space-x-15">
        <button
          className={`px-9 py-1 rounded-t-2xl ${
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

      {inputType === "option1" ? (
        <div className="relative items-center w-screen max-w-xl">
          <input
            type="text"
            value={singleDestination.dongName}
            onChange={(e) => {
              const q = e.target.value;
              setSingleDestination({ dongName: q, dongCode: "" });
              setQuery(q);
              fetchSuggestions(q);
            }}
            onKeyDown={handleKeyPress}
            placeholder="목적지(출근지,회사 등)의 지역명을 검색해보세요"
            className="w-full pr-10 pl-4 py-2.5 text-sm border border-[#2e58e4] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute top-1 right-3 p-1.5 text-[#2e58e4] rounded-full">
            <GrSearch className="text-lg cursor-pointer" onClick={handleNext} />
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="relative w-screen max-w-xl border rounded-lg border-[#2e58e4]">
          {[0, 1].map((idx) => (
            <div key={idx} className="border-b border-gray-300 relative">
              <input
                type="text"
                value={multiDestinations[idx].dongName}
                onChange={(e) => handleInputChange(idx, e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="목적지(출근지,회사 등)의 지역명을 검색해보세요"
                className="w-full pr-10 pl-4 py-2.5 indent-14 text-sm border border-[#2e58e4] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute text-xs text-white bg-[#2e58e4] p-1 rounded-md left-3 top-1/2 transform -translate-y-1/2">
                출근지 {idx + 1}
              </span>

              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                  {suggestions.map((item, sIdx) => (
                    <li
                      key={sIdx}
                      onClick={() => handleSelect(item, idx)}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="absolute top-5 right-3 p-1.5 bg-[#2e58e4] text-[#FFFFFF] rounded-full">
            <GrSearch className="text-lg cursor-pointer" onClick={handleNext} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
