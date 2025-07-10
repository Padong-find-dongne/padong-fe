import React, { useEffect, useState } from "react";
import { useSearchStore } from "../store/SearchStore";
import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { seoulDongs } from "./seoul-dongs";
const SearchBar = () => {
  const {
    inputType,
    setInputType,
    singleDestination,
    setSingleDestination,
    multiAddress1,
    multiAddress2,
    setFirstMobility,
    setSecondMobility,
    setIntersectedMobility,
    setMultiAddress1,
    setMultiAddress2,
    setRecommendations,
  } = useSearchStore();

  const [dongList, setDongList] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [multiSuggestions, setMultiSuggestions] = useState<string[][]>([
    [],
    [],
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setDongList(seoulDongs);
  }, []);

  const multiDestinations = [multiAddress1, multiAddress2];

  const setMultiDestination = (index: number, destination: any) => {
    if (index === 0) setMultiAddress1(destination);
    else setMultiAddress2(destination);
  };

  const handleInputChange = (value: string) => {
    setSingleDestination({ dongName: value, dongCode: "" });

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = dongList.filter((dong) => dong.includes(value.trim()));
    setSuggestions(filtered);
  };

  const handleMultiInputChange = (index: number, value: string) => {
    setMultiDestination(index, { dongName: value, dongCode: "" });

    if (!value.trim()) {
      setMultiSuggestions((prev) => {
        const newState = [...prev];
        newState[index] = [];
        return newState;
      });
      return;
    }

    const filtered = dongList.filter((dong) => dong.includes(value.trim()));

    setMultiSuggestions((prev) => {
      const newState = [...prev];
      newState[index] = filtered;
      return newState;
    });
  };

  const handleSelect = (dongName: string, index: number = 0) => {
    if (inputType === "option1") {
      setSingleDestination({ dongName, dongCode: "" });
      setSuggestions([]);
    } else {
      setMultiDestination(index, { dongName, dongCode: "" });
      setMultiSuggestions((prev) => {
        const newState = [...prev];
        newState[index] = [];
        return newState;
      });
    }
  };

  const fetchRecommendations = async (address: string) => {
    try {
      const res = await axios.get(
        `https://padong.site/mobility/address?address=${encodeURIComponent(
          address
        )}`
      );
      return res.data?.data ?? [];
    } catch (e) {
      console.error("추천 요청 실패:", e);
      return [];
    }
  };

  const fetchRecommendationsMulti = async (
    address1: string,
    address2: string
  ) => {
    try {
      const res = await axios.get(
        `https://padong.site/mobility/address/multi?address1=${encodeURIComponent(
          address1
        )}&address2=${encodeURIComponent(address2)}&page=0`
      );
      return res.data?.data ?? [];
    } catch (e) {
      console.error("추천 요청 실패:", e);
      return [];
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNext();
    }
  };

  const handleNext = async () => {
    setIsLoading(true);
    if (inputType === "option1") {
      const dongName = singleDestination.dongName;
      if (!dongList.includes(dongName)) {
        alert("행정동 리스트에서 선택해주세요");
        setIsLoading(false);
        return;
      }

      const recommendations = await fetchRecommendations(dongName);
      setRecommendations(recommendations);
      navigate("/search");
    } else {
      const [addr1, addr2] = multiDestinations.map((d) => d.dongName);
      if (!dongList.includes(addr1) || !dongList.includes(addr2)) {
        alert("행정동 리스트에서 선택해주세요");
        setIsLoading(false);
        return;
      }

      const recommendations = await fetchRecommendationsMulti(addr1, addr2);
      setFirstMobility(recommendations.firstMobility);
      setSecondMobility(recommendations.secondMobility);
      setIntersectedMobility(recommendations.intersectedMobility);
      navigate("/search-multi");
    }
  };

  return (
    <div className="relative flex flex-col items-center space-y-4">
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
            onChange={(e) => handleInputChange(e.target.value)}
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
                onChange={(e) => handleMultiInputChange(idx, e.target.value)}
                placeholder="목적지(출근지,회사 등)의 지역명을 검색해보세요"
                className="w-full pr-10 pl-4 py-2.5 indent-14 text-sm border border-[#2e58e4] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute text-xs text-white bg-[#2e58e4] p-1 rounded-md left-3 top-1/2 transform -translate-y-1/2">
                출근지 {idx + 1}
              </span>

              {multiSuggestions[idx].length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
                  {multiSuggestions[idx].map((item, sIdx) => (
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

      <div className="absolute w-100 flex flex-col items-center mt-5">
        {isLoading && (
          <LoadingSpinner
            loadingMent="추천 행정동을 검색하고 있어요"
            imageSrc="../public/images/loading.png"
            fullScreen={true}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
