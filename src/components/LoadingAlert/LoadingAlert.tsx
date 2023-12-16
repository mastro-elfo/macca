import { Alert, AlertTitle, LinearProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

type LoadingAlertProps = {
  loading?: boolean;
};

export default function LoadingAlert({ loading }: LoadingAlertProps) {
  const { t } = useTranslation();

  if (!loading) return null;

  return (
    <Alert severity="info">
      <AlertTitle>{t("Loading")}</AlertTitle>
      <LinearProgress />
    </Alert>
  );
}
