import { useTheme } from "@mui/material";
import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import { renderToString } from "react-dom/server";
import { Marker } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import ArtworkIcon from "../ArtworkIcon/ArtworkIcon";
import ArtworkPopup from "../ArtworkPopup/ArtworkPopup";
import { ArtworkEntity } from "../artworkModel";

type ArtworkMarkerProps = {
  artwork: ArtworkEntity;
  highlight?: boolean;
};

export default function ArtworkMarker({
  highlight,
  artwork,
}: ArtworkMarkerProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const markerRef = useRef<L.Marker>(null);

  const handleClick = () => {
    navigate(`/map/${artwork.latitude}/${artwork.longitude}/18/${artwork.id}`);
  };

  const icon = useMemo(
    () =>
      L.divIcon({
        className:
          "leaflet-marker-icon leaflet-zoom-animated leaflet-interactive",
        iconSize: highlight ? [48, 48] : [24, 24],
        iconAnchor: highlight ? [24, 48] : [12, 24],
        html: renderToString(
          <ArtworkIcon
            style={{
              color: theme.palette.primary.main,
              fontSize: highlight ? "48px" : "24px",
            }}
          />
        ),
      }),
    [highlight]
  );

  useEffect(() => {
    if (highlight) {
      markerRef.current?.openPopup();
    }
  }, [highlight]);

  return (
    <Marker
      position={[artwork.latitude, artwork.longitude]}
      title={artwork.title}
      icon={icon}
      eventHandlers={{
        click: handleClick,
      }}
      ref={markerRef}
    >
      <ArtworkPopup artwork={artwork} />
    </Marker>
  );
}
