import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Coord = {
  lat: number;
  lng: number;
};

type Position = {
  end: Coord;
};

const DongDetailMap = ({ end }: Position) => {
  // 기본 아이콘 설정
  const defaultIcon = new L.Icon({
    iconUrl: "/images/marker.png", // 배포 환경에서 절대 경로 사용
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer
      center={end}
      zoom={15}
      style={{ height: "700px", width: "80%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={end} icon={defaultIcon}></Marker>
    </MapContainer>
  );
};

export default DongDetailMap;
