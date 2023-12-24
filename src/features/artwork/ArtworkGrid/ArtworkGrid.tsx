import { Grid } from "@mui/material";
import ArtworkCard from "../ArtworkCard/ArtworkCard";
import { ArtworkEntity } from "../artworkModel";

type ArtworkGridProps = {
  artworks: ArtworkEntity[];
};

export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  return (
    <Grid container spacing={2} alignItems="stretch">
      {artworks.map((artwork) => (
        <Grid item key={artwork.id} xs={12} sm={6} md={4}>
          <ArtworkCard artwork={artwork} />
        </Grid>
      ))}
    </Grid>
  );
}
