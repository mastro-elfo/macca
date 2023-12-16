import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import DrawerContent from "../../features/drawer/DrawerContent/DrawerContent";
import DrawerIconButton from "../../features/drawer/DrawerIconButton/DrawerIconButton";

type PageLayoutProps = PropsWithChildren<{
  title?: ReactNode;
  loading?: boolean;
}>;

export default function PageLayout({
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
      <Container>{children ?? <Outlet />}</Container>
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
    </>
  );
}
