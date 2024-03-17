import { useTranslation } from "react-i18next";
import Markdown from "../../components/Markdown/Markdown";
import PageLayout from "../../layouts/PageLayout/PageLayout";
import useDocumentTitle from "../../services/useDocumentTitle";
import useMarkdownTranslation from "../../services/useMarkdownTranslation";

export default function WhatIsMaccaPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("What is MACCA?"));

  const contentQuery = useMarkdownTranslation("what-is-macca.md");

  return (
    <PageLayout
      title={t("What is MACCA?")}
      py={1}
      background={{
        image: "slide-opera-MACCA.jpg",
        absolutePath: true,
        position: "bottom",
        size: "cover",
        opacity: 0.25,
      }}
      loading={contentQuery.isFetching}
    >
      <Markdown>{contentQuery.data}</Markdown>
    </PageLayout>
  );
}
