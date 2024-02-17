import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, ButtonProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type BackButtonProps = Omit<ButtonProps, "onClick" | "startIcon">;

export default function BackButton(props: BackButtonProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Button
      {...props}
      title={t("Back")}
      startIcon={<ArrowBackIcon />}
      onClick={handleClick}
    >
      {t("Back")}
    </Button>
  );
}
