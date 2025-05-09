import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useSearchStore } from "../store/SearchStore";
import SeoulMap from "../components/SeoulMap";
import Header from "../components/Header";
import "../styles/Media.css";
import type { Recommendation } from "../store/SearchStore";
import axios from "axios";
const FindMap = () => {
  const {
    recommendations,
    setSelectedRecommendation,
    singleDestination,
    multiDestinations,
    inputType,
    setBoundaryData,
  } = useSearchStore();

  const navigate = useNavigate();

  const handleDong = (data: Recommendation) => () => {
    setSelectedRecommendation(data);
    navigate("/detail-dong");
  };

  type BoundaryMap = {
    [code: string]: { points: number[][] };
  };

  useEffect(() => {
    const fetchBoundaries = async () => {
      const codes = recommendations.map((r) => r.departureDong.adminDongCode);

      const allData: BoundaryMap = {};

      await Promise.all(
        codes.map(async (code) => {
          try {
            const res = await axios.get(`https://padong.siteboundary/${code}`);
            allData[code] = res.data.data; // { points: [...] }
          } catch (e) {
            console.error(`${code} boundary 요청 실패`, e);
          }
        })
      );

      setBoundaryData(allData);
    };

    if (recommendations.length > 0) fetchBoundaries();
  }, [recommendations]);

  return (
    <div>
      <Header />
      <div className="mt-5 ml-10 mr-10 flex flex-row space-x-10">
        <aside className="basis-1/2 w-100 flex flex-col ">
          {/*inputType에 따라 다르게 렌더링*/}
          {inputType === "option1" ? (
            <div>
              <div className="p-2 w-full max-w-md border rounded-lg border-[#3356CC] border-2">
                <span className="font-[600] mr-2">출근지</span>
                <span className="text-lg text-[#818181] mb-0.3 mr-5">|</span>
                <span className="text-[#818181]">
                  {singleDestination?.dongName || ""}
                </span>
              </div>
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
          <div className="mt-15 not-first-of-type:h-[700px] snap-y overflow-y-auto">
            {recommendations.map((rec) => (
              <div
                className="mb-15"
                key={rec.departureDong.adminDongCode}
                onClick={handleDong(rec)}
              >
                <p className="snap-start text-[#3D3D3D] font-bold text-[20px]">
                  {rec.departureDong.address}
                </p>
                <div className="score snap-start mt-5 ">
                  <div className="grid grid-col-2 gap-3 mt-3 ">
                    <div className="flex col-span-2 ">
                      <span>파동 점수</span>

                      <div className="px-2 py-0.5 bg-[#3356CC] border rounded-lg text-xs text-white">
                        {rec.score}
                      </div>
                    </div>
                    <div>
                      {" "}
                      <span>안전등급</span> {rec.safety}
                    </div>
                    <div>
                      {" "}
                      <span>인구밀도</span>
                      {rec.density}
                    </div>
                    <div>
                      {" "}
                      <span>평균 월세</span>
                      {rec.avgMonthlyRent}
                    </div>
                    <div>
                      {" "}
                      <span>평균 전세</span> {rec.avgJeonseDeposit}
                    </div>
                    <div className="mt-1 col-span-2">
                      <hr className="mb-3 text-[#F2F2F2]"></hr>
                      <span>출퇴근 시간</span>
                      {rec.avgTime}
                    </div>
                    <div className="col-span-2">
                      {" "}
                      <span>평균 유동인구</span>
                      {rec.totalMobility}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <SeoulMap />
      </div>
    </div>
  );
};

export default FindMap;
