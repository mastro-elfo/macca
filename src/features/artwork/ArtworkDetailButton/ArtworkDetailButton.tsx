import { Button, ButtonProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DetailIcon from "../../../components/DetailIcon/DetailIcon";
import { ArtworkEntity } from "../artworkModel";

type ArtworkDetailButtonProps = Omit<
  ButtonProps,
  "children" | "endIcon" | "onClick"
> & {
  artwork?: ArtworkEntity;
};

export default function ArtworkDetailButton({
  artwork,
  ...props
}: ArtworkDetailButtonProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!artwork) return null;

  return (
    <Button
      {...props}
      endIcon={<DetailIcon />}
      onClick={() => {
        navigate(`/artworks/${artwork.id}`);
      }}
    >
      {t("Detail")}
    </Button>
  );
}
