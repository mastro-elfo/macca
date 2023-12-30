import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuthorFullNameFormatter } from "../../author/authorService";
import ArtworkDetailButton from "../ArtworkDetailButton/ArtworkDetailButton";
import { ArtworkEntity } from "../artworkModel";

type ArtworkCardProps = {
  artwork: ArtworkEntity;
};

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const { t } = useTranslation();

  const fullNameFormatter = useAuthorFullNameFormatter();

  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {!!artwork.images.length && (
        <CardMedia
          sx={{ height: 140 }}
          image={`/macca/media/${artwork.images[0].path}`}
          title={artwork.images[0].attribution.title}
        />
      )}
      <CardHeader
        title={
          <Stack
            spacing={2}
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Typography variant="h6">{artwork.title}</Typography>
            <Typography variant="h6">{artwork.year}</Typography>
          </Stack>
        }
        subheader={fullNameFormatter(artwork.author)}
      />

      <CardContent sx={{ flex: 1 }}>
        {/* TODO: flex */}
        <Typography>{artwork.tags.map((tag) => t(tag)).join(", ")}</Typography>
      </CardContent>

      <CardActions
        sx={{
          flexDirection: "row-reverse",
        }}
      >
        <ArtworkDetailButton artwork={artwork} />
      </CardActions>
    </Card>
  );
}
