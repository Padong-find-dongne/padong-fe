import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchStore } from "../store/SearchStore";
import SeoulMap from "../components/SeoulMap";
import Header from "../components/Header";
import "../styles/Media.css";
import type { Recommendation } from "../store/SearchStore";
import axios from "axios";

const MultiFindMap = () => {
  const {
    firstMobility,
    secondMobility,
    intersectedMobility,
    multiAddress1,
    multiAddress2,
    selectedRecommendation,
    setSelectedRecommendation,
    setMobilityOption,
    setBoundaryData,
    moblilityOption,
  } = useSearchStore();

  const navigate = useNavigate();

  const handleDong = (data: Recommendation) => () => {
    setMobilityOption(moblilityOption);
    setSelectedRecommendation(data);
    navigate("/multi-dong");
    console.log("선택된 추천 동:", data);
    console.log("선택된 추천 동 코드:", { moblilityOption });
  };
  // 선택된 추천 리스트
  const selectedRecommendations: Recommendation[] =
    moblilityOption === "firstMobility"
      ? firstMobility
      : moblilityOption === "secondMobility"
      ? secondMobility
      : intersectedMobility;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchBoundaries = async (dongCodes: string[]) => {
    const allData: Record<string, any> = {};

    setIsLoading(true); // 데이터 로딩 시작

    await Promise.all(
      dongCodes.map(async (code) => {
        try {
          const res = await axios.get(`https://padong.site/boundary/${code}`);
          allData[code] = res.data.data;
        } catch (e) {
          console.error(`${code} boundary 요청 실패`, e);
        }
      })
    );

    setBoundaryData(allData);
    setIsLoading(false); // 데이터 로딩 완료
  };

  useEffect(() => {
    const dongCodes = selectedRecommendations.map(
      (dong) => dong.departureDong.adminDongCode
    );
    fetchBoundaries(dongCodes);
  }, [moblilityOption, firstMobility, secondMobility, intersectedMobility]);
  return (
    <div>
      <Header />

      <div className="mt-5 ml-10 mr-10 flex flex-row space-x-10">
        <aside className="basis-1/2 w-100 flex flex-col">
          <div className="p-2 w-full max-w-md border rounded-lg border-[#3356CC] border-2">
            <div className="border-b border-gray-200">
              <span className="font-[600] mr-2">출근지1</span>
              <span className="text-lg text-[#818181] mb-0.3 mr-5">|</span>
              <span className="text-[#818181]">
                {multiAddress1?.dongName || ""}
              </span>
            </div>
            <div>
              <span className="font-[600] mr-2">출근지2</span>
              <span className="text-lg text-[#818181] mb-0.3 mr-5">|</span>
              <span className="text-[#818181]">
                {multiAddress2?.dongName || ""}
              </span>
            </div>
          </div>

          <div className="mt-4 space-x-2">
            <button
              className={`px-3 py-1 rounded ${
                moblilityOption === "firstMobility"
                  ? "bg-[#3356CC] text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setMobilityOption("firstMobility")}
            >
              출근지1
            </button>
            <button
              className={`px-3 py-1 rounded ${
                moblilityOption === "secondMobility"
                  ? "bg-[#3356CC] text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setMobilityOption("secondMobility")}
            >
              출근지2
            </button>
            <button
              className={`px-3 py-1 rounded ${
                moblilityOption === "intersectedMobility"
                  ? "bg-[#3356CC] text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setMobilityOption("intersectedMobility")}
            >
              겹치는 곳
            </button>
          </div>

          <div className="mt-6 h-[700px] overflow-y-auto ">
            {Array.isArray(selectedRecommendations) &&
            selectedRecommendations.length > 0 ? (
              selectedRecommendations.map((rec) => (
                <div
                  className="mb-15 mt-3 cursor-pointer"
                  key={rec.departureDong.adminDongCode}
                  onClick={handleDong(rec)}
                >
                  <p className="text-[#3D3D3D] font-bold text-[20px]">
                    {rec.departureDong.address}
                  </p>

                  <div className="score mt-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex col-span-2">
                        <span>파동 점수</span>
                        <div className="px-2 py-0.5 bg-[#3356CC] border rounded-lg text-xs text-white ml-2">
                          {rec.score}
                        </div>
                      </div>
                      <div>
                        <span>안전등급</span> {rec.safety}
                      </div>
                      <div>
                        <span>인구밀도</span> {rec.density}
                      </div>
                      <div>
                        <span>평균 월세</span> {rec.avgMonthlyRent}
                      </div>
                      <div>
                        <span>평균 전세</span> {rec.avgJeonseDeposit}
                      </div>
                      <div className="col-span-2 mt-2">
                        <hr className="mb-2 border-gray-200" />
                        <span>출퇴근 시간</span> {rec.avgTime}
                      </div>
                      <div className="col-span-2">
                        <span>평균 유동인구</span> {rec.totalMobility}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>추천 데이터가 없습니다.</p>
            )}
          </div>
        </aside>

        <div className="basis-1/2">
          <SeoulMap />
        </div>
      </div>
    </div>
  );
};

export default MultiFindMap;
