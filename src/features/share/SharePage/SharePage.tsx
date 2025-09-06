import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PageLayout from "../../../layouts/PageLayout/PageLayout";
import useDocumentTitle from "../../../services/useDocumentTitle";
import { useAppSnackbar } from "../../../system/AppSnackbar/AppSnackbar";
import { useDataUrl } from "../shareService";

export default function SharePage() {
  const { t } = useTranslation();
  useDocumentTitle(t("Share"));
  const { info } = useAppSnackbar();
  const theme = useTheme();

  const link = window.location.origin + window.location.pathname;
  const qrcode = useDataUrl(link, {
    width: theme.breakpoints.values.sm,
  });
  const hasClipboard = !!navigator.clipboard as boolean;

  return (
    <PageLayout
      title={t("Share")}
      loading={qrcode.isFetching}
      background={{
        image: "undraw_share-link_y9oh.svg",
        opacity: 0.5,
        position: "bottom right",
        size: "sm",
      }}
      maxWidth="sm"
    >
      <Typography paragraph>{t("SHARE_PAGE_P1")}</Typography>
      <Typography paragraph>{t("SHARE_PAGE_P2")}</Typography>

      <img
        src={qrcode.data}
        alt={t("Link to page", { href: link })}
        style={{
          display: "block",
          margin: "auto",
          maxWidth: theme.breakpoints.values.sm,
          width: "100%",
        }}
      />

      <ListItemButton
        title={t("Copy to clipboard")}
        onClick={() => {
          void navigator.clipboard.writeText(link).then(() => {
            info(t("Copied to clipboard"));
          });
        }}
        disabled={!link || !hasClipboard}
      >
        {hasClipboard && (
          <ListItemIcon>
            <ContentCopyIcon />
          </ListItemIcon>
        )}
        <ListItemText>{link}</ListItemText>
      </ListItemButton>
    </PageLayout>
  );
}
