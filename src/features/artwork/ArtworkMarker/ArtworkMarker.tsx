import PlaceIcon from "@mui/icons-material/Place";
import { Typography, useTheme } from "@mui/material";
import L from "leaflet";
import { useMemo } from "react";
import { renderToString } from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import ArtworkDetailButton from "../ArtworkDetailButton/ArtworkDetailButton";
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
          <PlaceIcon
            style={{
              color: theme.palette.primary.main,
              fontSize: highlight ? "48px" : "24px",
            }}
          />
        ),
      }),
    [highlight]
  );

  return (
    <Marker
      position={[artwork.latitude, artwork.longitude]}
      title={artwork.title}
      icon={icon}
      eventHandlers={{
        click: handleClick,
      }}
    >
      <Popup>
        <Typography>{artwork.title}</Typography>
        <ArtworkDetailButton artwork={artwork} />
      </Popup>
    </Marker>
  );
}
