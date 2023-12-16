import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { it } from "date-fns/locale";
import { PropsWithChildren } from "react";

export default function AppLocalizationProvider({
  children,
}: PropsWithChildren) {
  const locale = useLocale();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      {children}
    </LocalizationProvider>
  );
}

function useLocale() {
  // const {
  //   i18n: { language },
  // } = useTranslation();
  // const compact = language.substring(0, 2);
  // if (compact === "en") return enUS;
  return it;
}
