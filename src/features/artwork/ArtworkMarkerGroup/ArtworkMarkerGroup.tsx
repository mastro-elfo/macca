import {
  List,
  ListItemButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import L from "leaflet";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { renderToString } from "react-dom/server";
import { Marker, Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { useAuthorFullNameFormatter } from "../../author/authorService";
import { ArtworkEntity } from "../artworkModel";

type ArtworkMarkerGroupProps = {
  artworks: ArtworkEntity[];
  zoom: number;
  selectedArtworkId: number;
};

export default function ArtworkMarkerGroup({
  artworks,
  selectedArtworkId,
  zoom,
}: ArtworkMarkerGroupProps) {
  const groups = useMemo(
    () => generateGroups(artworks, zoom),
    [artworks, zoom]
  );

  const selectedGroup = useMemo(
    () =>
      groups.find((group) =>
        group.artworks.find((artwork) => selectedArtworkId === artwork.id)
      ),
    [selectedArtworkId, groups]
  );

  return (
    <>
      {groups.map((group) => (
        <ArtworkMarker
          key={group.id}
          group={group}
          highlight={group.id === selectedGroup?.id}
          zoom={zoom}
        />
      ))}
    </>
  );
}

type ArtworkMarkerProps = {
  group: Group;
  highlight: boolean;
  zoom: number;
};

function ArtworkMarker({ group, highlight, zoom }: ArtworkMarkerProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const markerRef = useRef<L.Marker>(null);

  const icon = useCallback(
    (group: Group) =>
      L.divIcon({
        className:
          "leaflet-marker-icon leaflet-zoom-animated leaflet-interactive",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        html: renderToString(
          <div
            style={{
              backgroundColor: highlight
                ? theme.palette.secondary.main
                : theme.palette.primary.main,
              textAlign: "center",
              borderRadius: theme.shape.borderRadius,
              color: highlight
                ? theme.palette.secondary.contrastText
                : theme.palette.primary.contrastText,
              boxShadow: theme.shadows[1],
              ...theme.typography.button,
            }}
          >
            {group.artworks.length}
          </div>
        ),
      }),
    [theme, highlight]
  );

  const handleMarkerClick = () => {
    navigate(
      `/map/${group.artworks[0].latitude}/${group.artworks[0].longitude}/${zoom}/${group.artworks[0].id}`
    );
  };

  const handleDetailClick = (artwork: ArtworkEntity) => () => {
    navigate(`/artworks/${artwork.id}`);
  };

  useEffect(() => {
    if (highlight) {
      markerRef.current?.openPopup();
    }
  }, [highlight]);

  const fullNameFormatter = useAuthorFullNameFormatter();

  return (
    <Marker
      position={[group.latitude, group.longitude]}
      icon={icon(group)}
      eventHandlers={{
        click: handleMarkerClick,
      }}
      ref={markerRef}
    >
      <Popup autoPan={false}>
        <List dense sx={{ maxHeight: 240, overflow: "auto" }}>
          {group.artworks.map((artwork) => (
            <ListItemButton
              key={artwork.id}
              disableGutters
              onClick={handleDetailClick(artwork)}
            >
              <Stack direction="column">
                <Typography variant="body1" component="div">
                  {artwork.title}
                </Typography>
                <Typography variant="body2" component="div">
                  {artwork.authors.map(fullNameFormatter).join(", ")}
                </Typography>
              </Stack>
            </ListItemButton>
          ))}
        </List>
      </Popup>
    </Marker>
  );
}

type Point = {
  latitude: number;
  longitude: number;
};

type Group = {
  id: number;
  artworks: ArtworkEntity[];
  latitude: number;
  longitude: number;
  zoom: number;
};

function generateGroups(artworks: ArtworkEntity[], zoom: number) {
  return artworks.reduce<Group[]>((groups, artwork) => {
    const group = groups.find((g) => areNear(g, artwork, zoom));
    if (group) {
      group.artworks.push(artwork);
      const { latitude, longitude } = averagePosition(group.artworks);
      group.latitude = latitude;
      group.longitude = longitude;
    } else {
      groups.push({
        id: artwork.id,
        artworks: [artwork],
        latitude: artwork.latitude,
        longitude: artwork.longitude,
        zoom,
      });
    }
    return groups;
  }, []);
}

function averagePosition(artworks: ArtworkEntity[]) {
  const { latitude, longitude } = artworks.reduce(
    (acc, cur) => ({
      latitude: acc.latitude + cur.latitude,
      longitude: acc.longitude + cur.longitude,
    }),
    {
      latitude: 0,
      longitude: 0,
    }
  );
  return artworks.length
    ? {
        latitude: latitude / artworks.length,
        longitude: longitude / artworks.length,
      }
    : {
        latitude: 0,
        longitude: 0,
      };
}

const THRESHOLDS: Record<number, number> = {
  0: 50,
  1: 20,
  2: 10,
  3: 5,
  4: 2,
  5: 1,
  6: 0.5,
  7: 0.2,
  8: 0.1,
  9: 0.05,
  10: 0.02,
  11: 0.01,
  12: 0.0075, // 0.0055 - 0.0075
  13: 0.004,
  14: 0.003, // 0.002 - 0.003
  15: 0.001,
  16: 0.0005,
  17: 0.0002,
  18: 0.000125, // 0.0001 - 0.000125
} as const;

function areNear(artwork1: Point, artwork2: Point, zoom: number) {
  return (
    Math.abs(artwork1.latitude - artwork2.latitude) < THRESHOLDS[zoom] &&
    Math.abs(artwork1.longitude - artwork2.longitude) < THRESHOLDS[zoom]
  );
}
