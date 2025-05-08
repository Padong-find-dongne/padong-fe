import React, { useEffect, useState } from "react";

const LocateInfo = () => {
  const [totalTime, setTotalTime] = useState(null);
  const [transportation, setTransportation] = useState([]);

  useEffect(() => {
    const VITE_TMAP_APP_KEY = import.meta.env.VITE_TMAP_APP_KEY;
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        appKey: VITE_TMAP_APP_KEY,
      },
      body: JSON.stringify({
        startX: "126.926493082645",
        startY: "37.6134436427887",
        endX: "127.126936754911",
        endY: "37.5004198786564",
        lang: 0,
        format: "json",
        count: 1, // 1개 경로만 받아오기
        searchDttm: "202301011200",
      }),
    };

    fetch("https://apis.openapi.sk.com/transit/routes/sub", options)
      .then((res) => res.json())
      .then((data) => {
        const itinerary = data?.metaData?.plan?.itineraries?.[0];
        if (itinerary) {
          setTotalTime(itinerary.totalTime); // 소요 시간 (단위: 분)
          const trafficTypes = Array.isArray(itinerary.subPath)
            ? itinerary.subPath.map((path: any) => {
                switch (path.pathType) {
                  case 1:
                    return "지하철";
                  case 2:
                    return "버스";
                  case 3:
                    return "버스 + 지하철";
                  case 4:
                    return "고속/시외버스";
                  case 5:
                    return "기차";
                  case 6:
                    return "항공";
                  case 7:
                    return "해운";
                  default:
                    return "기타";
                }
              })
            : [];
          setTransportation(trafficTypes);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>소요 시간: {totalTime ? `${totalTime}분` : "불러오는 중..."}</h2>
      <h3>이용 교통수단:</h3>
      <ul>
        {transportation.map((type, index) => (
          <li key={index}>{type}</li>
        ))}
      </ul>
    </div>
  );
};

export default LocateInfo;
