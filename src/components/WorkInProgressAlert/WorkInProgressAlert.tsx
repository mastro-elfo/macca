import { Alert, AlertTitle } from "@mui/material";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

export default function WorkInProgressAlert({ children }: PropsWithChildren) {
  const { t } = useTranslation();
  return (
    <Alert severity="warning">
      <AlertTitle>{t("Work in progress")}</AlertTitle>
      {children}
    </Alert>
  );
}
