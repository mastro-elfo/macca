import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ArtworkEntity, ArtworkImage } from "../artworkModel";

type ArtworkImageDialogProps = DialogProps & {
  artwork?: ArtworkEntity;
  image?: ArtworkImage | null;
};

export default function ArtworkImageDialog({
  artwork,
  image,
  onClose,
  ...props
}: ArtworkImageDialogProps) {
  const { t } = useTranslation();

  // FIXME: large images are cropped

  return (
    <Dialog fullScreen onClose={onClose} {...props}>
      <DialogTitle>{image?.attribution.title}</DialogTitle>
      <DialogContent>
        <Stack height="100%" justifyContent="center">
          <img
            src={`/macca/media/${image?.path}`}
            alt={t("artwork-image-alt", { ...artwork })}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(event) => onClose?.(event, "escapeKeyDown")}
          title={t("Close")}
        >
          {t("Close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
