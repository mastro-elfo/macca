import WalkingIcon from "@mui/icons-material/DirectionsWalk";
import InactiveGeoLocation from "@mui/icons-material/LocationSearching";
import StandingIcon from "@mui/icons-material/Man";
import ActiveGeoLocation from "@mui/icons-material/MyLocation";
import { Fab, useTheme } from "@mui/material";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { renderToString } from "react-dom/server";
import { Circle, Marker } from "react-leaflet";
import LoadingProgress from "../../../components/LoadingProgress/LoadingProgress";

export default function Geolocation() {
  const theme = useTheme();

  const [position, setPosition] = useState<GeolocationPosition>();
  const [active, setActive] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
      return () => clearInterval(iv);
    }
  }, [active]);

  return (
    <>
      {!!position && (
        <>
          <Marker
            position={[position.coords.latitude, position.coords.longitude]}
            icon={icon}
          ></Marker>
          <Circle
            center={[position.coords.latitude, position.coords.longitude]}
            pathOptions={{
              fillColor: theme.palette.primary.main,
              fillOpacity: 0.2,
              color: theme.palette.primary.main,
            }}
            radius={position.coords.accuracy}
          />
        </>
      )}
      <Fab
        size="small"
        color={error ? "error" : "primary"}
        sx={(theme) => ({
          position: "fixed",
          zIndex: theme.zIndex.appBar,
          top: theme.spacing(1),
          right: theme.spacing(1),
        })}
        onClick={() => setActive(!active)}
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
