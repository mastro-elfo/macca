import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import FloatingHeader from "../../../components/FloatingHeader/FloatingHeader";
import FullpageLayout from "../../../layouts/FullpageLayout/FullpageLayout";
import useDocumentTitle from "../../../services/useDocumentTitle";
import ArtworkMarker from "../../artwork/ArtworkMarker/ArtworkMarker";
import { useArtworkListQuery } from "../../artwork/artworkService";
import MapProvider from "../MapProvider/MapProvider";
import MapToolbar from "../MapToolbar/MapToolbar";

export default function MapPage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Map"));

  const { id } = useParams();
  const artworkListQuery = useArtworkListQuery();

  return (
    <FullpageLayout>
      <FloatingHeader>
        <MapToolbar />
      </FloatingHeader>
      <MapProvider>
        {artworkListQuery.data?.map((artwork) => (
          <ArtworkMarker
            key={artwork.id}
            artwork={artwork}
            highlight={artwork.id === Number(id)}
          />
        ))}
      </MapProvider>
      {/* TODO: show other place of interest */}
    </FullpageLayout>
  );
}
