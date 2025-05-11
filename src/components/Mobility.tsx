import { useEffect, useState } from "react";
import { useSearchStore } from "../store/SearchStore";

type Coord = {
  lat: number;
  lng: number;
};

type MobilityProps = {
  start: Coord;
  end: Coord;
};
// Leg 타입 정의
type Leg = {
  mode: "WALK" | "BUS" | "SUBWAY";
  sectionTime: number;
  distance?: number;
};
// API 응답에서 사용할 주요 타입 정의
type Itinerary = {
  totalTime: number;
  totalWalkTime?: number;
  legs: Leg[];
};
const Mobility = ({ start, end }: MobilityProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [route, setRoute] = useState<Itinerary | null>(null);
  const [walkOnlyTime, setWalkOnlyTime] = useState<number | null>(null);
  const appKey = import.meta.env.VITE_TMAP_APP_KEY;
  const { multiDestinations, singleDestination } = useSearchStore();
  const arrivalName = singleDestination.dongName;
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

      // 도보만 이동 시 예상 시간 계산
      const totalDistance = itinerary.legs?.reduce(
        (sum: number, leg: Leg) => sum + (leg.distance || 0),
        0
      );
      const estimatedWalkTime = totalDistance ? totalDistance / (5000 / 60) : 0; // 5km/h → 5000m/60min
      setWalkOnlyTime(estimatedWalkTime);
    } catch (err) {
      console.error("Tmap API 요청 실패:", err);
      setErrorMessage("Tmap API 요청 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    getRoute();
  }, [start, end]);

  const busTime = (route?.totalTime || 0) - (route?.totalWalkTime || 0);

  return (
    <div className="p-4 bg-gray-100 rounded-xl text-sm mt-5">
      {errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : route ? (
        <div>
          <div className="flex justify-between">
            <p className="text-md font-semibold text-[#585858]">소요 시간</p>
            <p className="text-md text-[#585858]">
              {(route.totalTime / 60).toFixed(1)} 분
            </p>
            <p className="text-md font-semibold text-[#585858]">거리</p>
            <p className="text-md text-[#585858]">
              {route.legs.reduce(
                (sum: number, leg: Leg) => sum + (leg.distance || 0),
                0
              )}{" "}
              m
            </p>
          </div>

          <p className="text-md font-semibold text-[#585858]">대중교통</p>

          <div className="flex justify-between">
            <div className="flex flex-col">
              <img
                src="/images/bus.png"
                alt="버스"
                className="w-4 h-4 inline"
              />
              <span>{busTime}</span>
            </div>
            <div className="flex flex-col">
              <img
                src="/images/walk-icon.png"
                alt="지하철"
                className="w-4 h-4 inline"
              />
              <span className="font-semibold">
                {(route.totalWalkTime ? route.totalWalkTime / 60 : 0).toFixed(
                  1
                )}
                분
              </span>
            </div>
            <div className="flex flex-col">
              <span>{arrivalName}</span>
              <img
                src="/images/arrival.png"
                alt="목적지"
                className="w-4 h-4 inline"
              />
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
