import WalkingIcon from "@mui/icons-material/DirectionsWalk";
import InactiveGeoLocation from "@mui/icons-material/LocationSearching";
import StandingIcon from "@mui/icons-material/Man";
import ActiveGeoLocation from "@mui/icons-material/MyLocation";
import { Fab, useTheme } from "@mui/material";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { renderToString } from "react-dom/server";
import { useTranslation } from "react-i18next";
import { Marker, useMap } from "react-leaflet";
import LoadingProgress from "../../../components/LoadingProgress/LoadingProgress";
import AccuracyCircle from "./AccuracyCircle";

export default function Geolocation() {
  const theme = useTheme();
  const { t } = useTranslation();

  const [position, setPosition] = useState<GeolocationPosition>();
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const map = useMap();

  const zoom = map.getZoom();

  const markerIcon = position?.coords?.speed ? (
    <WalkingIcon
      style={{
        color: theme.palette.primary.main,
        fontSize: "24px",
      }}
    />
  ) : (
    <StandingIcon
      style={{
        color: theme.palette.primary.main,
        fontSize: "24px",
      }}
    />
  );

  const icon = useMemo(
    () =>
      L.divIcon({
        className:
          "leaflet-marker-icon leaflet-zoom-animated leaflet-interactive",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        html: renderToString(markerIcon),
      }),
    [markerIcon]
  );

  useEffect(() => {
    if (active && navigator.geolocation) {
      setLoading(true);
      const handler = () => {
        navigator.geolocation.getCurrentPosition(
          (currentPosition) => {
            setPosition(currentPosition);
            setError(false);
            setLoading(false);
          },
          () => {
            setError(true);
            setLoading(false);
          }
        );
      };
      const iv = setInterval(handler, 5000);
      return () => {
        clearInterval(iv);
      };
    }
  }, [active]);

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <>
      {!!position && (
        <>
          <Marker
            position={[position.coords.latitude, position.coords.longitude]}
            icon={icon}
          ></Marker>
          <AccuracyCircle
            accuracy={position.coords.accuracy}
            latitude={position.coords.latitude}
            longitude={position.coords.longitude}
            zoom={zoom}
            pathOptions={{
              fillColor: theme.palette.primary.main,
              fillOpacity: 0.2,
              color: theme.palette.primary.main,
            }}
          />
        </>
      )}
      <Fab
        size="small"
        color={error ? "error" : "primary"}
        sx={(theme) => ({
          position: "fixed",
          zIndex: theme.zIndex.appBar,
          top: theme.spacing(2),
          right: theme.spacing(1),
        })}
        onClick={handleToggle}
        title={t("Activate geolocation")}
      >
        <LoadingProgress
          variant="circular"
          color="secondary"
          loading={loading}
          sx={{ position: "absolute" }}
        />
        {active ? (
          <ActiveGeoLocation fontSize="small" />
        ) : (
          <InactiveGeoLocation fontSize="small" />
        )}
      </Fab>
    </>
  );
}
