import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import ArtworkIcon from "../../artwork/ArtworkIcon/ArtworkIcon";
import MapIcon from "../../map/MapIcon/MapIcon";

export default function DrawerContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <List disablePadding>
      <ListItemButton
        onClick={() => navigate("/")}
        selected={location.pathname.startsWith("/map")}
      >
        <ListItemIcon>
          <MapIcon />
        </ListItemIcon>
        <ListItemText>{t("Map")}</ListItemText>
      </ListItemButton>
      <ListItemButton
        onClick={() => navigate("/artworks")}
        selected={location.pathname.startsWith("/artworks")}
      >
        <ListItemIcon>
          <ArtworkIcon />
        </ListItemIcon>
        <ListItemText>{t("Artworks")}</ListItemText>
      </ListItemButton>

      {/* TODO: add author list */}
    </List>
  );
}
