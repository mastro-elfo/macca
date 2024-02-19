import { Drawer, IconButton, IconButtonProps } from "@mui/material";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import DrawerIcon from "../DrawerIcon/DrawerIcon";

type DrawerIconButtonProps = Omit<IconButtonProps, "children" | "onClick"> & {
  drawer?: ReactNode;
};

export default function DrawerIconButton({
  drawer,
  title,
  ...props
}: DrawerIconButtonProps) {
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
        color="inherit"
        title={title ?? t("Menu")}
        {...props}
      >
        <DrawerIcon />
      </IconButton>
      <Drawer open={open} onClose={handleClose}>
        {drawer}
      </Drawer>
    </>
  );
}
