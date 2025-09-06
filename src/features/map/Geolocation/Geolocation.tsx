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
import useBreakpoint from "../../../services/useBreakpoint";
import { useAppSnackbar } from "../../../system/AppSnackbar/AppSnackbar";
import AccuracyCircle from "./AccuracyCircle";

export default function Geolocation() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { error: snackbarError } = useAppSnackbar();

  const [position, setPosition] = useState<GeolocationPosition>();
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const map = useMap();
  const { only: xsmall } = useBreakpoint("xs");

  const zoom = map.getZoom();

  const icon = useMemo(() => {
    const markerIcon = position?.coords.speed ? (
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
    return L.divIcon({
      className:
        "leaflet-marker-icon leaflet-zoom-animated leaflet-interactive",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      html: renderToString(markerIcon),
    });
  }, [position?.coords.speed, theme.palette.primary.main]);

  useEffect(() => {
    if (active) {
      setLoading(true);
      const handler = () => {
        navigator.geolocation.getCurrentPosition(
          (currentPosition) => {
            setPosition(currentPosition);
            setError(false);
            setLoading(false);
          },
          (err) => {
            setError(true);
            setLoading(false);
            snackbarError(err.message);
            if (err.code === err.PERMISSION_DENIED) {
              setActive(false);
            }
          }
        );
      };
      const iv = setInterval(handler, 5000);
      return () => {
        clearInterval(iv);
      };
    }
  }, [active, snackbarError]);

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
          top: xsmall ? undefined : theme.spacing(2),
          bottom: xsmall ? theme.spacing(2) : undefined,
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
