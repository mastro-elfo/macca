import { useTranslation } from "react-i18next";
import WorkInProgressAlert from "../../../components/WorkInProgressAlert/WorkInProgressAlert";
import PageLayout from "../../../layouts/PageLayout/PageLayout";

export default function AuthorListPage() {
  const { t } = useTranslation();

  return (
    <PageLayout
      title={t("Artworks")}
      //   loading={artworkListQuery.isFetching}
      py={1}
      background={{
        image: "undraw_artist_b-4-rc.svg",
        position: "bottom right",
        opacity: 0.5,
      }}
    >
      <WorkInProgressAlert />
    </PageLayout>
  );
}
