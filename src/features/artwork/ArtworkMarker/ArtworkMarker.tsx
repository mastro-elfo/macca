import { Stack, Typography, useTheme } from "@mui/material";
import L from "leaflet";
import { useEffect, useMemo, useRef } from "react";
import { renderToString } from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useAuthorFullNameFormatter } from "../../author/authorService";
import ArtworkDetailButton from "../ArtworkDetailButton/ArtworkDetailButton";
import ArtworkIcon from "../ArtworkIcon/ArtworkIcon";
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

  const fullNameFormatter = useAuthorFullNameFormatter();

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
      {/* TODO: ArtworkPopup */}
      <Popup offset={[0, -24]} autoPan={false}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" component="div">
            {artwork.title}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="div">
            {artwork.authors.map(fullNameFormatter).join(", ")}
          </Typography>
          <Typography component="div">{artwork.year}</Typography>
        </Stack>
        <Typography variant="body2" component="div">
          {artwork.town} - {artwork.address}
        </Typography>
        <Stack direction="row" justifyContent="flex-end">
          <ArtworkDetailButton artwork={artwork} size="small" />
        </Stack>
      </Popup>
    </Marker>
  );
}
