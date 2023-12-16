import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { enUS as muiEnUs, itIT as muiItIt } from "@mui/material/locale";
import { PropsWithChildren, useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function AppTheme({ children }: PropsWithChildren) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const locales = useLocales();

  const themeUtility = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const theme = useMemo(
    () =>
      createTheme(
        themeUtility,
        {
          palette: {
            primary: themeUtility.palette.augmentColor({
              color: { main: "#6da22f" },
              name: "HubPrimary",
            }),
            secondary: themeUtility.palette.augmentColor({
              color: { main: "#142c47" },
              name: "HubSecondary",
            }),
          },
          components: {
            MuiListItemText: {
              defaultProps: {
                primaryTypographyProps: {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              },
            },
            MuiDialog: {
              defaultProps: {
                maxWidth: "lg",
              },
            },
            MuiAppBar: {
              defaultProps: {
                color: "primary",
                // enableColorOnDark: true,
              },
            },
          },
        },
        ...locales
      ),
    [themeUtility, locales]
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
