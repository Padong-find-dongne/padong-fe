import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSearchStore } from "../store/SearchStore";

const SeoulMap = () => {
  const { boundaryData } = useSearchStore();
  type BoundaryData = {
    points: number[][];
  };
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

      {boundaryData &&
        Object.entries(boundaryData).map(([code, { points }]) => (
          <Polygon
            key={code}
            positions={points.map(([lng, lat]) => [lat, lng])} // Leaflet은 [lat, lng] 순서!
            pathOptions={{ color: "#4A6CDF", fillOpacity: 0.4 }}
          />
        ))}
    </MapContainer>
  );
};

export default SeoulMap;
