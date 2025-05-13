import { useEffect, useState } from "react";
import { useSearchStore } from "../store/SearchStore";

type Coord = {
  lat: number;
  lng: number;
};

type MobilityProps = {
  start: Coord;
  end: Coord;
  arrivalName: string;
};

// API 응답에서 사용할 주요 타입 정의
type Itinerary = {
  totalTime: number;
  totalWalkTime?: number;
  totalDistance: number;
};

const Mobility = ({ start, end, arrivalName }: MobilityProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [route, setRoute] = useState<Itinerary | null>(null);
  const appKey = import.meta.env.VITE_TMAP_APP_KEY;
  [];

  const getRoute = async () => {
    if (!start || !end) {
      setErrorMessage("출발지 또는 도착지 좌표가 유효하지 않습니다.");
      return;
    }

    try {
      const now = new Date();
      const searchDttm = now.toISOString().replace(/[-:T]/g, "").slice(0, 12); // YYYYMMDDHHmm

      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          appKey: appKey,
        },
        body: JSON.stringify({
          startX: start.lng.toString(),
          startY: start.lat.toString(),
          endX: end.lng.toString(),
          endY: end.lat.toString(),
          format: "json",
          count: 1,
          searchDttm,
        }),
      };

      const response = await fetch(
        "https://apis.openapi.sk.com/transit/routes/sub",
        options
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("API 에러:", error);
        setErrorMessage(`Tmap API 오류: ${response.status}`);
        return;
      }

      const result = await response.json();
      console.log("Tmap 결과:", result);

      const itinerary = result.metaData?.plan?.itineraries?.[0];

      if (!itinerary) {
        setErrorMessage("도보 5분 이내에 위치해 있습니다");
        return;
      }

      setRoute(itinerary);
    } catch (err) {
      console.error("Tmap API 요청 실패:", err);
      setErrorMessage("Tmap API 요청 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    getRoute();
  }, [start, end]);

  const busTime = (
    ((route?.totalTime || 0) - (route?.totalWalkTime || 0)) /
    60
  ).toFixed(1);

  return (
    <div className="mt-7">
      {errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : route ? (
        <div>
          <p className="text-lg font-semibold text-[#585858]">• 대중교통</p>
          <div className="p-10 bg-gray-100 rounded-xl text-sm mt-5">
            <div className="flex space-x-5">
              <div className="flex space-x-3">
                <p className="text-lg font-semibold text-[#585858]">소요시간</p>
                <p className="text-lg text-[#585858]">
                  {(route.totalTime / 60).toFixed(1)} 분
                </p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-semibold ml-6 text-[#585858]">
                  거리
                </p>
                <p className="text-lg text-[#585858]">
                  {(route.totalDistance / 1000).toFixed(1)}km
                </p>
              </div>
            </div>
            {/*루트 상세 정보*/}
            <div className="relative pt-7 flex items-center justify-between">
              <div className="flex flex-col items-center z-10 ">
                <img src="/images/bus.png" alt="버스" className="w-15 h-15" />
                <div className="text-[#585858]">{busTime}분</div>
              </div>
              <div className="flex items-center flex-col z-10">
                <img
                  src="/images/walk-icon.png"
                  alt="지하철"
                  className="w-15 h-15"
                />
                <div className="text-[#585858]">
                  {(route.totalWalkTime ? route.totalWalkTime / 60 : 0).toFixed(
                    1
                  )}
                  분
                </div>
              </div>
              <div className="flex flex-col items-center  z-10 ">
                <img
                  src="/images/arrive.png"
                  alt="목적지"
                  className="w-15 h-15"
                />
                <div className="text-[#585858]">{arrivalName}</div>
              </div>
              <hr className="absolute top-1/2 left-0 right-0 h-px bg z-0 text-[#DADADA]" />
            </div>
          </div>
          <div className="mt-7">
            <p className="text-lg font-semibold text-[#585858]">• 자가용</p>
            <div className="p-10 bg-gray-100 rounded-xl text-sm mt-5">
              {/*도보 정보*/}
              <div className="relative flex items-center justify-between ">
                <div className="flex flex-col items-center z-10">
                  <img
                    src="/images/car.png"
                    alt="자동차"
                    className="w-15 h-15"
                  />
                  <div className="text-[#585858]">
                    {(route?.totalDistance / 500).toFixed(1)}분
                  </div>
                </div>
                <div className="flex items-center flex-col z-10">
                  <img
                    src="/images/arrive.png"
                    alt="목적지"
                    className="w-15 h-15"
                  />
                  <div className="text-[#585858]">{arrivalName}</div>
                </div>
                <hr className="absolute top-1/2 left-0 right-0 h-px bg z-0 text-[#DADADA]" />
              </div>
            </div>
          </div>
          <div className="mt-7">
            <p className="text-lg font-semibold text-[#585858]">• 도보</p>
            <div className="p-10 bg-gray-100 rounded-xl text-sm mt-5">
              {/*도보 정보*/}
              <div className="relative flex items-center justify-between ">
                <div className="flex flex-col items-center z-10">
                  <img
                    src="/images/walk-icon.png"
                    alt="도보"
                    className="w-15 h-15"
                  />
                  <div className="text-[#585858]">
                    {(route?.totalDistance / 83.33).toFixed(1)}분
                  </div>
                </div>
                <div className="flex items-center flex-col z-10">
                  <img
                    src="/images/arrive.png"
                    alt="목적지"
                    className="w-15 h-15"
                  />
                  <div className="text-[#585858]">{arrivalName}</div>
                </div>
                <hr className="absolute top-1/2 left-0 right-0 h-px bg z-0 text-[#DADADA]" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>이동 경로 계산 중...</p>
      )}
    </div>
  );
};

export default Mobility;
