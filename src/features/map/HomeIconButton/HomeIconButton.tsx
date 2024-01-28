import { IconButton, IconButtonProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../HomeIcon/HomeIcon";

type HomeIconButtonProps = Omit<IconButtonProps, "children" | "onClick">;

export default function HomeIconButton({
  title,
  ...props
}: HomeIconButtonProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate("/", {});
  };

  return (
    <IconButton onClick={handleClick} title={title ?? t("Home")} {...props}>
      <HomeIcon />
    </IconButton>
  );
}
