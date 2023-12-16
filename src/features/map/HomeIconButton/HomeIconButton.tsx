import { IconButton, IconButtonProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../HomeIcon/HomeIcon";

type HomeIconButtonProps = Omit<IconButtonProps, "children" | "onClick">;

export default function HomeIconButton(props: HomeIconButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", {});
  };

  return (
    <IconButton onClick={handleClick} {...props}>
      <HomeIcon />
    </IconButton>
  );
}
