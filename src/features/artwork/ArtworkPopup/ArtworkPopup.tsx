import { Stack, Typography } from "@mui/material";
import { Popup, PopupProps } from "react-leaflet";
import { useAuthorFullNameFormatter } from "../../author/authorService";
import ArtworkDetailButton from "../ArtworkDetailButton/ArtworkDetailButton";
import { ArtworkEntity } from "../artworkModel";

type ArtworkPopupProps = PopupProps & {
  artwork: ArtworkEntity;
};

export default function ArtworkPopup({ artwork, ...props }: ArtworkPopupProps) {
  const fullNameFormatter = useAuthorFullNameFormatter();

  return (
    <Popup {...props} offset={[0, -24]} autoPan={false}>
      <Stack direction="row" spacing={2}>
        <Typography variant="h6" component="div">
          {artwork.title}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="div">
          {artwork.authors.map(fullNameFormatter).join(", ")}
        </Typography>
        <Typography component="div">{artwork.year}</Typography>
      </Stack>
      <Typography variant="body2" component="div">
        {artwork.town} - {artwork.address}
      </Typography>
      <Stack direction="row" justifyContent="flex-end">
        <ArtworkDetailButton artwork={artwork} size="small" />
      </Stack>
    </Popup>
  );
}
