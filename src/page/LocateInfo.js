import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
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
                    ? itinerary.subPath.map((path) => {
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
    return (_jsxs("div", { children: [_jsxs("h2", { children: ["\uC18C\uC694 \uC2DC\uAC04: ", totalTime ? `${totalTime}분` : "불러오는 중..."] }), _jsx("h3", { children: "\uC774\uC6A9 \uAD50\uD1B5\uC218\uB2E8:" }), _jsx("ul", { children: transportation.map((type, index) => (_jsx("li", { children: type }, index))) })] }));
};
export default LocateInfo;
