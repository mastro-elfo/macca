import { ComponentProps } from "react";
import { Circle } from "react-leaflet";

type AccuracyCircleProps = Pick<
  ComponentProps<typeof Circle>,
  "pathOptions"
> & {
  accuracy: number;
  latitude: number;
  longitude: number;
  zoom: number;
};

export default function AccuracyCircle({
  accuracy,
  latitude,
  longitude,
  zoom,
  ...props
}: AccuracyCircleProps) {
  if (!showAccuracyCircle(zoom, accuracy)) return null;
  return <Circle center={[latitude, longitude]} radius={accuracy} {...props} />;
}

const ZOOM_ACCURACY_MIN_RADIUS: Record<number, number> = {
  18: 8,
  17: 16,
  16: 32,
  15: 64,
  14: 128,
  13: 256,
  12: 512,
  11: 1024,
  10: 2048,
  9: 4096,
  8: 8192,
  7: 16384,
  6: 32768,
  5: 65536,
  4: 131072,
  3: 262144,
  2: 524288,
  1: 1048576,
  0: 2097152,
} as const;

function showAccuracyCircle(zoom: number, accuracy: number) {
  const minRadius = ZOOM_ACCURACY_MIN_RADIUS[zoom];
  if (!minRadius) return true;
  return minRadius < accuracy;
}
