import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppSnackbar } from "../../../system/AppSnackbar/AppSnackbar";
import { useDataUrl } from "../shareService";

type ShareDialogProps = DialogProps & { link?: string };

export default function ShareDialog({ link, ...props }: ShareDialogProps) {
  const { info } = useAppSnackbar();
  const { t } = useTranslation();

  const qrcode = useDataUrl(link);

  return (
    <Dialog {...props}>
      <DialogTitle>{t("Share this artwork")}</DialogTitle>
      <DialogContent>
        <img
          src={qrcode.data}
          alt={t("Link to page", { href: link })}
          style={{ display: "block", margin: "auto" }}
        />

        <ListItemButton
          title={t("Copy to clipboard")}
          onClick={() => {
            void navigator.clipboard.writeText(link ?? "").then(() => {
              info(t("Copied to clipboard"));
            });
          }}
          disabled={!link}
        >
          <ListItemIcon>
            <ContentCopyIcon />
          </ListItemIcon>
          <ListItemText>{link}</ListItemText>
        </ListItemButton>
      </DialogContent>
    </Dialog>
  );
}
