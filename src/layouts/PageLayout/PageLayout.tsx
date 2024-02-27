import {
  AppBar,
  Box,
  BoxProps,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import BackgroundBox from "../../components/BackgroundBox/BackgroundBox";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import ToTopFab from "../../components/ToTopFab/ToTopFab";
import DrawerContent from "../../features/drawer/DrawerContent/DrawerContent";
import DrawerIconButton from "../../features/drawer/DrawerIconButton/DrawerIconButton";

type PageLayoutProps = PropsWithChildren & {
  actions?: ReactNode;
  background?: ComponentProps<typeof BackgroundBox>;
  title?: ReactNode;
  loading?: boolean;
  showBackButton?: boolean;
} & Pick<BoxProps, "py">;

export default function PageLayout({
  actions,
  background,
  children,
  loading,
  py,
  showBackButton,
  title,
}: PageLayoutProps) {
  return (
    <>
      <AppBar>
        <Toolbar>
          <DrawerIconButton drawer={<DrawerContent />} edge="start" />
          <Typography variant="h5" flex={1} textOverflow="ellipsis" noWrap>
            {title}
          </Typography>
          {actions}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Box py={py}>
          {showBackButton && <BackButton size="small" />}
          {children ?? <Outlet />}
        </Box>
      </Container>
      <LoadingProgress
        loading={loading}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      />
      {!!background && <BackgroundBox {...background} />}
      <ToTopFab size="small" color="primary" />
    </>
  );
}
