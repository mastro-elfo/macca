import {
  Badge,
  BadgeProps,
  IconButton,
  IconButtonProps,
  Menu,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import FilterIcon from "../FiltersIcon/FiltersIcon";

type FilterIconButtonProps = Omit<IconButtonProps, "onClick"> & {
  badgeProps?: Pick<
    BadgeProps,
    "badgeContent" | "color" | "invisible" | "variant"
  >;
};

export default function FilterIconButton({
  badgeProps,
  children,
  ...props
}: FilterIconButtonProps) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton title={t("Filters")} onClick={handleOpen} {...props}>
        <Badge {...badgeProps}>
          <FilterIcon />
        </Badge>
      </IconButton>
      <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
        {children}
      </Menu>
    </>
  );
}
