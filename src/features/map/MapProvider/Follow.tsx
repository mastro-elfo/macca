import { useEffect } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";

type FollowProps = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export default function Follow({ latitude, longitude, zoom }: FollowProps) {
  const map = useMap();
  const navigate = useNavigate();
  const params = useParams();

  const handleUpdateUrl = (
    lat: number,
    lng: number,
    zoom: number,
    id?: string
  ) => {
    navigate(`/map/${lat}/${lng}/${zoom}/${id ?? ""}`);
  };

  useMapEvents({
    dragend: (event) => {
      const { lat, lng } = event.target.getCenter();
      const zoom = event.target.getZoom();
      handleUpdateUrl(lat, lng, zoom, params.id);
    },
    zoom: (event) => {
      const { lat, lng } = event.target.getCenter();
      const zoom = event.target.getZoom();
      handleUpdateUrl(lat, lng, zoom, params.id);
    },
  });

  useEffect(() => {
    map.setView([latitude, longitude], zoom);
  }, [latitude, longitude, zoom]);

  return null;
}
