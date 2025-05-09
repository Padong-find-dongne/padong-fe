import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Coord = {
  lat: number;
  lng: number;
};

type Position = {
  end: Coord;
};
const DongDetailMap = ({ end }: Position) => {
  return (
    <MapContainer
      center={end} // 서울 중심
      zoom={15}
      style={{ height: "700px", width: "80%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={end}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default DongDetailMap;
