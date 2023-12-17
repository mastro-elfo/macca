import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import useBreakpoint from "../../../services/useBreakpoint";
import { ArtworkEntity } from "../artworkModel";

type ArtworkImageListProps = {
  artwork?: ArtworkEntity;
};

export default function ArtworkImageList({ artwork }: ArtworkImageListProps) {
  const { only: isXs } = useBreakpoint("xs");
  const { only: isSm } = useBreakpoint("sm");

  if (!artwork) return null;

  return (
    <ImageList cols={isXs ? 1 : isSm ? 2 : 3} gap={8} variant="masonry">
      {artwork.images.map((image) => (
        <ImageListItem key={image.path}>
          <img src={`/macca/media/${image.path}`} />
          <ImageListItemBar
            title={image.attribution.title}
            // TODO: add link
            subtitle={image.attribution.url}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
