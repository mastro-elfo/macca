import { PropsWithChildren } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import DevelopLayout from "../../../layouts/DevelopLayout/DevelopLayout";
import Cross from "../Cross/Cross";
import Geolocation from "../Geolocation/Geolocation";
import Follow from "./Follow";
type MapProviderProps = PropsWithChildren;

export default function MapProvider({ children }: MapProviderProps) {
  const {
    lat = 43.54326008866115,
    lng = 10.745916366577148,
    zoom = 13,
  } = useParams();

  return (
    <MapContainer
      center={[Number(lat), Number(lng)]}
      zoom={Number(zoom)}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <Geolocation />
      <Follow
        latitude={Number(lat)}
        longitude={Number(lng)}
        zoom={Number(zoom)}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DevelopLayout>
        <Cross />
      </DevelopLayout>
      {children}
    </MapContainer>
  );
}
