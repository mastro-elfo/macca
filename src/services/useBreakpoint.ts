import { Breakpoint, Theme, useMediaQuery } from "@mui/material";
import { useMemo } from "react";

export default function useBreakpoint(
  breakpoint: Breakpoint,
  other?: Breakpoint
) {
  const up = useMediaQuery((theme: Theme) => theme.breakpoints.up(breakpoint));
  const down = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down(breakpoint)
  );
  const not = useMediaQuery((theme: Theme) =>
    theme.breakpoints.not(breakpoint)
  );
  const only = useMediaQuery((theme: Theme) =>
    theme.breakpoints.only(breakpoint)
  );
  const between = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between(breakpoint, other ?? breakpoint)
  );
  return useMemo(
    () => ({ up, down, not, only, between }),
    [up, down, not, only, between]
  );
}
