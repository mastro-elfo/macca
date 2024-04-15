import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import FloatingHeader from "../../../components/FloatingHeader/FloatingHeader";
import FullpageLayout from "../../../layouts/FullpageLayout/FullpageLayout";
import useDocumentTitle from "../../../services/useDocumentTitle";
import ArtworkMarkerGroup from "../../artwork/ArtworkMarkerGroup/ArtworkMarkerGroup";
import { useArtworkListQuery } from "../../artwork/artworkService";
import MapProvider from "../MapProvider/MapProvider";
import MapToolbar from "../MapToolbar/MapToolbar";

export default function MapPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Map"));

  const { id, zoom } = useParams();
  const artworkListQuery = useArtworkListQuery();

  return (
    <FullpageLayout>
      <FloatingHeader>
        <MapToolbar />
      </FloatingHeader>
      <MapProvider>
        <ArtworkMarkerGroup
          artworks={artworkListQuery.data ?? []}
          zoom={Number(zoom)}
          selectedArtworkId={Number(id)}
        />
      </MapProvider>
    </FullpageLayout>
  );
}
