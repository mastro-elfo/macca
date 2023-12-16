import { Drawer, IconButton, IconButtonProps } from "@mui/material";
import { ReactNode, useState } from "react";
import DrawerIcon from "../DrawerIcon/DrawerIcon";

type DrawerIconButtonProps = Omit<IconButtonProps, "children" | "onClick"> & {
  drawer?: ReactNode;
};

export default function DrawerIconButton({
  drawer,
  ...props
}: DrawerIconButtonProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen} {...props}>
        <DrawerIcon />
      </IconButton>
      <Drawer open={open} onClose={handleClose}>
        {drawer}
      </Drawer>
    </>
  );
}
