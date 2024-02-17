import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  createTheme,
  CssBaseline,
  PaletteColorOptions,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import primarySummer from "@mui/material/colors/amber"; // ffc107
import secondaryWinter from "@mui/material/colors/cyan"; // 00e5ff
import secondaryAutumn from "@mui/material/colors/deepOrange"; // ff3d00
import primarySpring from "@mui/material/colors/green"; // 4caf50
import primaryWinter from "@mui/material/colors/lightBlue"; // 03a9f4
import primaryAutumn from "@mui/material/colors/orange"; // ff9800
import secondary from "@mui/material/colors/pink";

import { enUS as muiEnUs, itIT as muiItIt } from "@mui/material/locale";
import { PropsWithChildren, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useSeason, { Season } from "../../services/useSeason/useSeason";

declare module "@mui/material/styles" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Theme {
    season: Season;
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ThemeOptions {
    season?: Season;
  }
}

export default function AppTheme({ children }: PropsWithChildren) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const locales = useLocales();
  const season = useSeason();

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: prefersDarkMode ? "dark" : "light",
            secondary: COLOR_BY_SEASON[season].secondary ?? secondary,
            primary: COLOR_BY_SEASON[season].primary,
          },
          season,
        },
        ...locales
      ),
    [prefersDarkMode, locales, season]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

function useLocales() {
  const {
    i18n: { language },
  } = useTranslation();
  const compact = language.substring(0, 2);
  return useMemo(() => {
    if (compact === "it") return [muiItIt];
    return [muiEnUs];
  }, [compact]);
}

const COLOR_BY_SEASON: Record<
  Season,
  { primary: PaletteColorOptions; secondary?: PaletteColorOptions }
> = {
  autumn: { primary: primaryAutumn, secondary: secondaryAutumn },
  spring: { primary: primarySpring },
  summer: { primary: primarySummer },
  winter: { primary: primaryWinter, secondary: secondaryWinter },
} as const;
