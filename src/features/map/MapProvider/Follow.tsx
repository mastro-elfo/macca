import { useEffect } from "react";
import { useMap } from "react-leaflet";

type FollowProps = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export default function Follow({ latitude, longitude, zoom }: FollowProps) {
  const map = useMap();

  useEffect(() => {
    map.setView([latitude, longitude], zoom);
  }, [latitude, longitude, zoom]);

  return null;
}
