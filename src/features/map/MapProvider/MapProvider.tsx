import { PropsWithChildren } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import Follow from "./Follow";
type MapProviderProps = PropsWithChildren;

export default function MapProvider({ children }: MapProviderProps) {
  const {
    lat = 43.54773160834968,
    lng = 10.720531940460207,
    zoom = 16,
  } = useParams();

  return (
    <MapContainer
      center={[Number(lat), Number(lng)]}
      zoom={Number(zoom)}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <Follow
        latitude={Number(lat)}
        longitude={Number(lng)}
        zoom={Number(zoom)}
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}
