import { useEffect, useState } from "react";

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

  // 대중교통 및 도보 구간별 시간 계산
  const calculateLegTime = (mode: "WALK" | "BUS" | "SUBWAY") => {
    if (!route || !route.legs) return 0; // route나 legs가 없으면 0을 반환

    // 해당 mode의 구간을 찾기
    const leg = route.legs.find((leg) => leg.mode === mode);

    // 해당 구간이 있으면 sectionTime을 분 단위로 변환하여 반환
    return leg ? leg.sectionTime / 60 : 0;
  };

  return (
    <div className="p-4 bg-gray-100 rounded-xl text-sm mt-5">
      {errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : route ? (
        <div>
          {walkOnlyTime && (
            <div className="mt-2">
              <p className="font-semibold">도보만 이동 시 예상 시간</p>
              <img
                src="/images/walk.png"
                alt="도보"
                className="w-4 h-4 inline"
              />
              <span className="ml-2">{walkOnlyTime.toFixed(1)}분</span>
            </div>
          )}
          <div className="mb-2">
            <p className="font-semibold">대중교통 이용 시 총 소요 시간</p>
            <span>{(route.totalTime / 60).toFixed(1)}분</span>
          </div>

          <div className="mb-2">
            <p className="font-semibold">
              🚶 도보:{" "}
              {(route.totalWalkTime ? route.totalWalkTime / 60 : 0).toFixed(1)}
              분
            </p>
            <p className="font-semibold">
              🚌 버스: {calculateLegTime("BUS").toFixed(1)}분
            </p>
            <p className="font-semibold">
              🚇 지하철: {calculateLegTime("SUBWAY").toFixed(1)}분
            </p>
          </div>
        </div>
      ) : (
        <p>이동 경로 계산 중...</p>
      )}
    </div>
  );
};

export default Mobility;
