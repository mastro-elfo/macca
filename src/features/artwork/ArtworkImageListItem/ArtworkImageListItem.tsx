import {
  ImageListItem,
  ImageListItemBar,
  ImageListItemProps,
  Link,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ArtworkEntity, ArtworkImage } from "../artworkModel";

type ArtworkImageListItemProps = ImageListItemProps & {
  artwork?: ArtworkEntity;
  image?: ArtworkImage | null;
  index: number;
};

export default function ArtworkImageListItem({
  artwork,
  image,
  index,
  ...props
}: ArtworkImageListItemProps) {
  const { t } = useTranslation();

  return (
    <ImageListItem key={image?.path} {...props}>
      <img
        src={`/macca/media/${image?.path}`}
        alt={t("artwork-image-alt", { ...artwork, index })}
      />
      <ImageListItemBar
        title={image?.attribution.title}
        subtitle={
          <Link href={image?.attribution.url} target="_blank" rel="noreferrer">
            {image?.attribution.url}
          </Link>
        }
      />
    </ImageListItem>
  );
}
