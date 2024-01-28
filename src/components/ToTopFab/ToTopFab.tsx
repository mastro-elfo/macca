import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Fab, FabProps, Zoom, styled, useScrollTrigger } from "@mui/material";
import { useTranslation } from "react-i18next";

type ToTopFabProps = Pick<FabProps, "color" | "size" | "title">;

export default function ToTopFab({ size, title, ...props }: ToTopFabProps) {
  const { t } = useTranslation();
  const trigger = useScrollTrigger({ threshold: 200 });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={trigger}>
      <StyledFab
        size={size}
        onClick={handleClick}
        title={title ?? t("Back to top")}
        {...props}
      >
        <ArrowUpwardIcon fontSize={size} />
      </StyledFab>
    </Zoom>
  );
}

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));
