import { useSearchStore } from "../store/SearchStore";
import { useAutoStore } from "../store/AutoStore";
import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMultiAutoStore } from "../store/MultiAutoStore";
import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
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

  const { suggestions, setQuery, fetchSuggestions, clear } = useAutoStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    multiSuggestions,
    setMultiQuery,
    queries,
    fetchMultiSuggestions,
    clearSuggestions,
  } = useMultiAutoStore();

  const navigate = useNavigate();
  //멀티 인풋 관리
  const multiDestinations = [multiAddress1, multiAddress2];
  const setMultiDestination = (index: number, destination: any) => {
    if (index === 0) {
      setMultiAddress1(destination);
    } else {
      setMultiAddress2(destination);
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

  // 다중 주소 추천 목록 fetch 함수
  const fetchRecommendationsMulti = async (
    address1: string,
    address2: string
  ) => {
    console.log("address1:", address1);

    console.log("address2:", address2);
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
  const handleInputChange = (index: number, value: string) => {
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleMultiInputChange = (index: number, value: string) => {
    setMultiDestination(index, { dongName: value, dongCode: "" });
    setMultiQuery(index, value);
  };

  const fetchAdminDongCode = async (
    inputType: "option1" | "option2",
    address1: string,
    address2?: string
  ): Promise<string | [string, string] | null> => {
    try {
      if (inputType === "option1") {
        const res = await fetch(
          `https://padong.site/mobility/address?address=${encodeURIComponent(
            address1
          )}`
        );
        const data = await res.json();
        return data?.data?.[0]?.departureDong?.adminDongCode ?? null;
      } else if (inputType === "option2" && address2) {
        const [res1, res2] = await Promise.all([
          fetch(
            `https://padong.site/mobility/address?address=${encodeURIComponent(
              address1
            )}`
          ),
          fetch(
            `https://padong.site/mobility/address?address=${encodeURIComponent(
              address2
            )}`
          ),
        ]);

        const data1 = await res1.json();
        const data2 = await res2.json();

        const code1 = data1?.data?.[0]?.departureDong?.adminDongCode ?? null;
        const code2 = data2?.data?.[0]?.departureDong?.adminDongCode ?? null;

        return code1 && code2 ? [code1, code2] : null;
      }
      return null;
    } catch (err) {
      console.error("행정동 코드 요청 실패:", err);
      return null;
    }
  };

  const handleSelect = async (dongName: string, index: number = 0) => {
    // option1일 경우 dongName만 전달하고, option2일 경우에도 dongName 하나만 전달
    const result = await fetchAdminDongCode(inputType, dongName);

    // 실패 케이스: null이거나, option2인데 반환값이 string인 경우 (의도된 에러 처리)
    if (!result || (inputType === "option2" && Array.isArray(result))) return;

    // option1인 경우: string 반환
    if (inputType === "option1" && typeof result === "string") {
      setSingleDestination({ dongName, dongCode: result });
    }

    // option2인 경우: string 반환 (각각 따로 호출했기 때문에 배열 아님!)
    else if (inputType === "option2" && typeof result === "string") {
      setMultiDestination(index, { dongName, dongCode: result });
    }

    clear();
  };

  const handleMultiSelect = (selected: string, idx: number) => {
    setMultiDestination(idx, { dongName: selected, dongCode: "" });
    clearSuggestions(idx); // 선택 후 해당 인덱스만 리스트 닫기
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
      const code =
        singleDestination.dongCode ||
        (await fetchAdminDongCode(inputType, dongName));
      if (!code) return alert("행정동 리스트에서 선택해주세요");

      const recommendations = await fetchRecommendations(dongName);
      setRecommendations(recommendations); // zustand store에 저장

      navigate("/search");
    } else {
      const [addr1, addr2] = multiDestinations.map((d) => d.dongName);
      const codes = await fetchAdminDongCode(inputType, addr1, addr2);
      if (!codes) return alert("행정동 리스트에서 선택해주세요");
      const [code1, code2] = Array.isArray(codes) ? codes : [codes, codes];
      setMultiDestination(0, { dongName: addr1, dongCode: code1 });
      setMultiDestination(1, { dongName: addr2, dongCode: code2 });

      console.log("저장된 multiAddress1:", multiAddress1);
      console.log("저장된 multiAddress2:", multiAddress2);
      if (!codes) return alert("행정동 리스트에서 선택해주세요");

      const recommendations = await fetchRecommendationsMulti(addr1, addr2);

      setFirstMobility(recommendations.firstMobility);
      setSecondMobility(recommendations.secondMobility);
      console.log(recommendations.firstMobility);
      console.log(recommendations.secondMobility);
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
                      onClick={() => handleMultiSelect(item, idx)}
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
          <LoadingSpinner loadingMent="추천 행정동을 검색하고 있어요" />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
