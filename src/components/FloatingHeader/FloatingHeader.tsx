import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";

type FloatingHeaderProps = PropsWithChildren<{
  width?: number;
}>;

export default function FloatingHeader({
  children,
  width = 320,
}: FloatingHeaderProps) {
  return (
    <Paper
      sx={(theme) => ({
        position: "fixed",
        top: theme.spacing(1),
        left: theme.spacing(1),
        zIndex: theme.zIndex.appBar,
        width,
      })}
    >
      {children}
    </Paper>
  );
}
