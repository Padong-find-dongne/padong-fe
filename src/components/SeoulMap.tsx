import { useEffect } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useBoundaryStore } from "../store/BoundaryStore"; // 경로는 실제 위치에 맞게 수정

// 예시: 미리 불러올 행정동 코드 배열
const adminDongCodes = ["1168064000", "1168065000"]; // 필요에 따라 동적으로 받아도 됨

const SeoulMap = () => {
  const { boundaries, fetchBoundary } = useBoundaryStore();

  useEffect(() => {
    adminDongCodes.forEach((code) => {
      fetchBoundary(code);
    });
  }, [fetchBoundary]);

  return (
    <MapContainer
      center={[37.5665, 126.978]}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Object.entries(boundaries).map(([key, boundary], idx) => {
        const rawPoints = boundary?.points;

        if (!Array.isArray(rawPoints) || rawPoints.length < 3) return null;

        const latlngs: [number, number][] = rawPoints.map(
          ([lng, lat]: [number, number]) => [lat, lng]
        );

        return (
          <Polygon
            key={key || idx}
            positions={latlngs}
            pathOptions={{
              color: "blue",
              weight: 2,
              opacity: 0.6,
              fillOpacity: 0.3,
            }}
          />
        );
      })}
    </MapContainer>
  );
};

export default SeoulMap;
