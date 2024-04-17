import { Alert, AlertTitle } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ArtworkDraftAlert() {
  const { t } = useTranslation("artwork");
  return (
    <Alert severity="info">
      <AlertTitle>{t("Draft")}</AlertTitle>
      {t("ArtworkDraftAlertContent")}
    </Alert>
  );
}
