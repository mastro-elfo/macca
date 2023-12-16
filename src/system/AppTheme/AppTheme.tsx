import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import primary from "@mui/material/colors/blue";
import secondary from "@mui/material/colors/pink";
import { enUS as muiEnUs, itIT as muiItIt } from "@mui/material/locale";
import { PropsWithChildren, useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function AppTheme({ children }: PropsWithChildren) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const locales = useLocales();

  const theme = useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode: prefersDarkMode ? "dark" : "light",
            primary,
            secondary,
          },
        },
        ...locales
      ),
    [prefersDarkMode, locales]
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
