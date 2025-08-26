import ShareIcon from "@mui/icons-material/Share";
import { IconButton, IconButtonProps } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ShareDialog from "../ShareDialog/ShareDialog";

type ShareIconButtonProps = IconButtonProps & { link?: string };

export default function ShareIconButton({
  link,
  ...props
}: ShareIconButtonProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        title={t("Share")}
        data-cy="ShareIconButton"
        {...props}
      >
        <ShareIcon />
      </IconButton>
      <ShareDialog open={open} onClose={handleClose} link={link} />
    </>
  );
}
