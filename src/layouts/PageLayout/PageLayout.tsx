import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import BackgroundBox from "../../components/BackgroundBox/BackgroundBox";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import DrawerContent from "../../features/drawer/DrawerContent/DrawerContent";
import DrawerIconButton from "../../features/drawer/DrawerIconButton/DrawerIconButton";

type PageLayoutProps = PropsWithChildren<{
  background?: ComponentProps<typeof BackgroundBox>;
  title?: ReactNode;
  loading?: boolean;
}>;

export default function PageLayout({
  background,
  children,
  loading,
  title,
}: PageLayoutProps) {
  return (
    <>
      <AppBar>
        <Toolbar>
          <DrawerIconButton drawer={<DrawerContent />} edge="start" />
          <Typography variant="h6" flex={1}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        {/* TODO: add padding */}
        {children ?? <Outlet />}
        {/* TODO: add to-top floating button */}
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
    </>
  );
}
