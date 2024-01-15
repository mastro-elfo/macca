import Markdown from "../../components/Markdown/Markdown";
import PageLayout from "../../layouts/PageLayout/PageLayout";
import useDocumentTitle from "../../services/useDocumentTitle";
import useMarkdownTranslation from "../../services/useMarkdownTranslation";

export default function PeccioliPage() {
  // const { t } = useTranslation();
  useDocumentTitle("Peccioli");

  const contentQuery = useMarkdownTranslation("peccioli.md");

  return (
    <PageLayout title={"Peccioli"} py={1} loading={contentQuery.isFetching}>
      <Markdown>{contentQuery.data}</Markdown>
    </PageLayout>
  );
}
