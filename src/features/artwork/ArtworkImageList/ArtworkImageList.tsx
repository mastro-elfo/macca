import { ImageList } from "@mui/material";
import { useState } from "react";
import useBreakpoint from "../../../services/useBreakpoint";
import ArtworkImageDialog from "../ArtworkImageDialog/ArtworkImageDialog";
import ArtworkImageListItem from "../ArtworkImageListItem/ArtworkImageListItem";
import { ArtworkEntity, ArtworkImage } from "../artworkModel";

type ArtworkImageListProps = {
  artwork?: ArtworkEntity;
};

export default function ArtworkImageList({ artwork }: ArtworkImageListProps) {
  const { only: isXs } = useBreakpoint("xs");
  const { only: isSm } = useBreakpoint("sm");

  const [selectedImage, setSelectedImage] = useState<ArtworkImage | null>(null);

  if (!artwork) return null;

  const cols = isXs ? 1 : isSm ? 2 : 3;

  return (
    <>
      <ImageList cols={cols} gap={8} variant="quilted">
        {artwork.images.map((image, index) => (
          <ArtworkImageListItem
            key={image.path}
            cols={Math.min(cols, image.cols)}
            onClick={() => {
              setSelectedImage(image);
            }}
            artwork={artwork}
            image={image}
            index={index}
            sx={{ cursor: "pointer" }}
          />
        ))}
      </ImageList>
      <ArtworkImageDialog
        artwork={artwork}
        image={selectedImage}
        open={!!selectedImage}
        onClose={() => {
          setSelectedImage(null);
        }}
      />
    </>
  );
}
