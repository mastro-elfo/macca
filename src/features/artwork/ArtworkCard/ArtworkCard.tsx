import DetailIcon from "@mui/icons-material/Visibility";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ArtworkEntity } from "../artworkModel";

type ArtworkCardProps = {
  artwork: ArtworkEntity;
};

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Card>
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
        subheader={artwork.author}
      />
      {/* TODO: add image */}

      <CardContent>
        <Typography>{artwork.tags.map((tag) => t(tag)).join(", ")}</Typography>
      </CardContent>

      <CardActions
        sx={{
          flexDirection: "row-reverse",
        }}
      >
        <Button
          endIcon={<DetailIcon />}
          onClick={() => navigate(`/artworks/${artwork.id}`)}
        >
          {t("Detail")}
        </Button>
      </CardActions>
    </Card>
  );
}
