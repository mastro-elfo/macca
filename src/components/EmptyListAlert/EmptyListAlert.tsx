import { Alert, AlertTitle } from "@mui/material";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

type EmptyListAlertProps = PropsWithChildren;

export default function EmptyListAlert({ children }: EmptyListAlertProps) {
  const { t } = useTranslation();

  return (
    <Alert severity="info">
      <AlertTitle>{t("No element found")}</AlertTitle>
      {children}
    </Alert>
  );
}
