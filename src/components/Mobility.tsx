import { useEffect, useState } from "react";

type Coord = {
  lat: number;
  lng: number;
};

type MobilityProps = {
  start: Coord;
  end: Coord;
};

const Mobility = ({ start, end }: MobilityProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [route, setRoute] = useState<any | null>(null);
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
    } catch (err) {
      console.error("Tmap API 요청 실패:", err);
      setErrorMessage("Tmap API 요청 중 오류가 발생했습니다.");
    }
  };

  // 출발지/도착지가 바뀔 때만 호출되도록
  useEffect(() => {
    getRoute();
  }, [start, end]);

  return (
    <div className="p-4 bg-gray-100 rounded-xl text-sm mt-5">
      {errorMessage ? (
        <p className="text-red-600">{errorMessage}</p>
      ) : route ? (
        <div>
          <p>🚌 총 소요 시간: {route.totalTime}분</p>
          <p>🚶 총 도보 시간: {route.totalWalkTime / 60}분</p>
          <p>🔁 환승 횟수: {route.transferCount}회</p>
          <p>📏 총 거리: {(route.totalDistance / 1000).toFixed(1)} km</p>
        </div>
      ) : (
        <p>이동 경로 계산 중...</p>
      )}
    </div>
  );
};

export default Mobility;
