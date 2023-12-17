import { Box, Breakpoint, useTheme } from "@mui/material";

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
  image: string;
  opacity?: number;
  size?: Breakpoint;
  position?: BackgroundPosition;
  transform?: string;
  drawerWidth?: number;
};

export default function BackgroundBox({
  image,
  opacity,
  position,
  size,
  transform,
  drawerWidth,
}: BackgroundBoxProps) {
  const theme = useTheme();

  return (
    <Box
      position="absolute"
      top={0}
      bottom={0}
      left={drawerWidth ?? 0}
      right={0}
      zIndex={-1}
      sx={{
        overflow: "hidden",
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundImage: `url(/macca/assets/${theme.season}/${image})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: position,
          backgroundSize: (theme) => ({
            xs: "contain",
            [size ?? "sm"]: theme.breakpoints.values[size ?? "sm"],
          }),
          opacity: opacity ?? 1,
          transform: transform,
        },
      }}
    />
  );
}
