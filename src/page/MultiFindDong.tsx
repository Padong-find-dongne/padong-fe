import React from "react";
import { useSearchStore } from "../store/SearchStore";
import axios from "axios";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Mobility from "../components/Mobility";
import DongDetailMap from "../components/DongDetailMap";
type RentPrice = {
  buildingType: string;
  avgJeonseDeposit: number;
  avgMonthlyDeposit: number;
  avgMonthlyRent: number;
};
type DongLocation = {
  address: string;
  type: string;
  lat: number;
  lng: number;
};

type DongDetailData = {
  adminDongCode: string;
  score: number;
  totalMobility: number;
  avgTime: number;
  density: number;
  trafficAccidents: number;
  fires: number;
  crimes: number;
  publicSafety: number;
  rentPrice: RentPrice[];
  location: DongLocation[];
};
const FindDong = () => {
  const { selectedRecommendation, multiAddress1, multiAddress2 } =
    useSearchStore();
  const [dongDetail, setDongDetail] = useState<DongDetailData | null>(null);

  const [location, setLocation] = useState<DongLocation[]>([]);

  // URL 쿼리 파라미터를 읽어옴
  const [searchParams] = useSearchParams();
  const arrivalCode = searchParams.get("arrivalCode");
  const departureCode = searchParams.get("departureCode");
  useEffect(() => {
    const fetchDongDetail = async () => {
      if (arrivalCode && departureCode) {
        try {
          const res = await axios.get(
            `https://padong.site/dongne/detail?arrivalCode=${arrivalCode}&departureCode=${departureCode}`
          );
          const data = res.data?.data;
          setDongDetail(data ?? null);
          setLocation(data?.location ?? []);
        } catch (e) {
          console.error("추천 요청 실패:", e);
        }
      }
    };

    fetchDongDetail();
  }, [arrivalCode, departureCode]);
  if (!dongDetail) return <div>로딩 중...</div>;

  const departureLocation = location.find((loc) => loc.type === "departure");
  const arrivalLocation = location.find((loc) => loc.type === "arrival");

  return (
    <div>
      <Header />
      <div className="mb-20 mt-5 ml-10 mr-10 flex flex-row space-x-30">
        <aside className="h-[700px] snap-y overflow-y-auto basis-1/2 w-100 flex flex-col ">
          <div>
            <div className="p-2 w-full max-w-md border rounded-lg border-[#3356CC] border-2">
              <span className="font-[600] mr-2">출근지</span>
              <span className="text-lg text-[#818181] mb-0.3 mr-5">|</span>
              <span className="text-[#818181]">{arrivalLocation?.address}</span>
            </div>
            <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold flex flex-col mt-2">
              <span className="text-[#4A6CDF] mt-5">
                {selectedRecommendation?.departureDong.address}
              </span>
              <span className="mt-5 mb-5">상세 정보</span>
            </div>
          </div>
          <hr className="text-[#F2F2F2]"></hr>{" "}
          <div className="grid grid-cols-2 gap-0.5 mt-6">
            <div className="grid grid-cols-2 gap-y-2 mt-6 text-sm">
              <span className="font-bold text-[18px] text-[#585858]">
                파동 점수
              </span>
              <span className="text-left text-[18px]">{dongDetail.score}</span>

              <span className="font-bold text-[18px] text-[#585858]">
                출퇴근 시간
              </span>
              <span className="text-left text-[18px]">
                {dongDetail.avgTime}
              </span>
              <span className="font-bold text-[18px] text-[#585858]">
                평균 유동인구
              </span>
              <span className="text-left text-[18px]">
                {dongDetail.totalMobility}
              </span>
              <span className="font-bold text-[18px] text-[#585858]">
                인구 밀도
              </span>
              <span className="text-left text-[18px]">
                {dongDetail.density}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-y-2 mt-6 text-sm">
              <span className="font-bold text-[18px] col-span-2 text-[#585858]">
                안전지수 등급
              </span>

              <span className="font-bold text-[18px] text-[#585858]">
                생활안전
              </span>
              <span className="text-left text-[18px] text-[#4A6CDF]">
                {dongDetail.publicSafety}
              </span>
              <span className="font-bold text-[18px] text-[#585858] ">
                교통사고
              </span>
              <span className="text-left text-[18px] text-[#4A6CDF]">
                {dongDetail.trafficAccidents}
              </span>
              <span className="font-bold text-[18px] text-[#585858]">화재</span>
              <span className="text-left text-[18px] text-[#4A6CDF]">
                {dongDetail.fires}
              </span>
              <span className="font-bold text-[18px] text-[#585858]">범죄</span>
              <span className="text-left text-[18px] text-[#4A6CDF]">
                {dongDetail.crimes}
              </span>
            </div>
          </div>
          {dongDetail.rentPrice.map((item, idx) => {
            let buildingText = "";
            let imagePath = "";

            switch (item.buildingType) {
              case "apartment":
                buildingText = "아파트";
                imagePath = "/images/apart.png";
                break;
              case "officetel":
                buildingText = "오피스텔";
                imagePath = "/images/opistel.png";
                break;
              case "villa":
                buildingText = "빌라";
                imagePath = "/images/billa.png";
                break;
              default:
                buildingText = item.buildingType;
                imagePath = "/images/apart.png";
            }

            return (
              <div className="mt-10" key={idx}>
                <div className="flex items-center space-x-8">
                  <img
                    className="w-[5vw] h-auto"
                    src={imagePath}
                    alt={buildingText}
                  />
                  <span className="text-[#3D3D3D] font-bold text-2xl">
                    {buildingText}
                  </span>
                </div>
                <div className="flex space-x-5 mt-5 ">
                  <span className="font-bold text-[22px] text-[#585858]">
                    월 세
                  </span>
                  <span className="text-[22px] text-[#585858] text-left">
                    {item.avgMonthlyDeposit.toLocaleString()}/
                    {item.avgMonthlyRent.toLocaleString()} 만원
                  </span>
                  <span className="ml-5 font-bold text-[22px] text-[#585858]">
                    전 세
                  </span>
                  <span className="text-left text-[22px] text-[#585858]">
                    {item.avgJeonseDeposit.toLocaleString()} 만원
                  </span>
                </div>

                <hr className="mt-10 text-[#F2F2F2]" />
              </div>
            );
          })}
          <div>
            <p className="text-[#3D3D3D] font-bold text-2xl mt-5">
              출근지까지 이동 시간
            </p>
            {departureLocation && arrivalLocation && (
              <>
                {console.log("출발지:", departureLocation)}
                {console.log("도착지:", arrivalLocation)}
                <Mobility
                  start={{
                    lat: departureLocation.lat,
                    lng: departureLocation.lng,
                  }}
                  end={{
                    lat: arrivalLocation.lat,
                    lng: arrivalLocation.lng,
                  }}
                />
              </>
            )}
          </div>
        </aside>
        {arrivalLocation && (
          <DongDetailMap
            end={{
              lat: arrivalLocation.lat,
              lng: arrivalLocation.lng,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FindDong;
