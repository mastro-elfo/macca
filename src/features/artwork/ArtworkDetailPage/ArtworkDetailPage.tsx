import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import useDocumentTitle from "../../../services/useDocumentTitle";
import { useArtworkDetailQuery } from "../artworkService";

export default function ArtworkDetailPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Artwork detail"));
  const { id } = useParams();

  const artworkDetailQuery = useArtworkDetailQuery(Number(id));

  return (
    <PageLayout
      title={t("Artwork detail")}
      loading={artworkDetailQuery.isFetching}
    >
      {artworkDetailQuery.data?.title}
    </PageLayout>
  );
}
