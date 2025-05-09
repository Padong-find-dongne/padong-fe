import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSearchStore } from "../store/SearchStore";

const SeoulMap = () => {
  const { boundaryData }: { boundaryData: Record<string, BoundaryData> } =
    useSearchStore();

  // boundaryData가 배열 형태로 되어 있을 때의 타입 정의
  type BoundaryData = {
    points: [number, number][]; // [lng, lat] 순서
  };

  // 타입이 BoundaryData 형태인 boundaryData가 존재할 경우 처리
  if (!boundaryData || typeof boundaryData !== "object") {
    return <div>Boundary data is not available</div>;
  }

  return (
    <MapContainer
      center={[37.5665, 126.978]} // 서울 중심
      zoom={12}
      style={{ height: "900px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* boundaryData가 객체이고 각 항목이 BoundaryData 타입을 따르도록 매핑 */}
      {boundaryData &&
        Object.entries(boundaryData).map(
          ([code, { points }]: [string, BoundaryData]) => (
            <Polygon
              key={code}
              positions={points.map(([lng, lat]) => [lat, lng])} // Leaflet은 [lat, lng] 순서!
              pathOptions={{ color: "#4A6CDF", fillOpacity: 0.4 }}
            />
          )
        )}
    </MapContainer>
  );
};

export default SeoulMap;
