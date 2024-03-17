import { Box, Breakpoint, Breakpoints } from "@mui/material";
import { Season } from "../../services/useSeason/useSeason";

type BackgroundPosition =
  | "center"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

type BackgroundBoxProps = {
  absolutePath?: boolean;
  drawerWidth?: number;
  image: string;
  opacity?: number;
  size?: Breakpoint | false | "cover";
  position?: BackgroundPosition;
  transform?: string;
};

export default function BackgroundBox({
  absolutePath,
  drawerWidth,
  image,
  opacity,
  position,
  size,
  transform,
}: BackgroundBoxProps) {
  return (
    <Box
      position="fixed"
      top={0}
      bottom={0}
      left={drawerWidth ?? 0}
      right={0}
      zIndex={-1}
      sx={(theme) => ({
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundImage: `url(${getImagePath(
            image,
            absolutePath,
            theme.season
          )})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: position,
          backgroundSize: {
            ...getBackgroundSize(size, theme.breakpoints.values),
          },
          opacity: opacity ?? 1,
          transform: transform,
        },
      })}
    />
  );
}

function getImagePath(image: string, absolute?: boolean, season?: Season) {
  if (absolute) return `/macca/assets/${image}`;
  return `/macca/assets/${season}/${image}`;
}

function getBackgroundSize(
  size: BackgroundBoxProps["size"],
  breakpointValues: Breakpoints["values"]
) {
  if (!size) {
    return {
      xs: "contain",
    };
  }
  if (size === "cover") {
    return {
      xs: "cover",
    };
  }
  return {
    xs: "contain",
    [size]: breakpointValues[size],
  };
}
