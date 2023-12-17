import { useTranslation } from "react-i18next";
import WorkInProgressAlert from "../../components/WorkInProgressAlert/WorkInProgressAlert";
import PageLayout from "../../layouts/PageLayout/PageLayout";

export default function WhatIsMaccaPage() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t("What is MACCA?")} py={1}>
      <WorkInProgressAlert />
    </PageLayout>
  );
}
