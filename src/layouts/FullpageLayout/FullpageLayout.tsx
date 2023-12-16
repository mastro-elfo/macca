import { Box } from "@mui/material";
import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

type FullpageLayoutProps = PropsWithChildren;

export default function FullpageLayout({ children }: FullpageLayoutProps) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      {children ?? <Outlet />}
    </Box>
  );
}
