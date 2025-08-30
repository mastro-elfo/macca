import { Paper } from "@mui/material";
import { PropsWithChildren } from "react";
import useBreakpoint from "../../services/useBreakpoint";

type FloatingHeaderProps = PropsWithChildren<{
  width?: number;
}>;

export default function FloatingHeader({
  children,
  width = 320,
}: FloatingHeaderProps) {
  const { only: xsmall } = useBreakpoint("xs");

  return (
    <Paper
      sx={(theme) => ({
        position: "fixed",
        top: theme.spacing(1),
        left: theme.spacing(1),
        right: theme.spacing(1),
        zIndex: theme.zIndex.appBar,
        width: xsmall ? "auto" : width,
        transition: "width ease 0.25s",
      })}
    >
      {children}
    </Paper>
  );
}
