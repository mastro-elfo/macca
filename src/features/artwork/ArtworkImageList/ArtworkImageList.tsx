import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Link,
} from "@mui/material";
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
            subtitle={
              <Link
                href={image.attribution.url}
                target="_blank"
                rel="noreferrer"
              >
                {image.attribution.url}
              </Link>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
