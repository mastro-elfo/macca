import { Container, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import BackgroundBox from "../../components/BackgroundBox/BackgroundBox";
import LoadingAlert from "../../components/LoadingAlert/LoadingAlert";
import useDocumentTitle from "../../services/useDocumentTitle";

export default function FallbackLayout() {
  const { t } = useTranslation();
  useDocumentTitle(t("Loading"));

  return (
    <>
      <Stack direction="column" height="100vh" justifyContent="center">
        <Container maxWidth="xs">
          <LoadingAlert loading={true} />
        </Container>
      </Stack>
      <BackgroundBox
        image="undraw_loading_re_5axr.svg"
        opacity={0.5}
        position="bottom"
        size="sm"
      />
    </>
  );
}
