import {
  LinearProgress,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  Stack,
} from "@mui/material";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

type InfiniteContainerProps = PropsWithChildren<{
  query: UseInfiniteQueryResult;
  intersectionRef: ListItemButtonProps["ref"];
}>;

export default function InfiniteContainer({
  query,
  intersectionRef,
  children,
}: InfiniteContainerProps) {
  const { t } = useTranslation();
  const primary = query.hasNextPage ? t("Load more") : t("End of the list");

  const handleClick = () => {
    void query.fetchNextPage();
  };

  return (
    <Stack direction="column">
      {children}
      <ListItemButton
        ref={intersectionRef}
        disabled={!query.hasNextPage || query.isFetching}
        onClick={handleClick}
      >
        <ListItemText
          primary={primary}
          secondary={query.isFetching && <LinearProgress />}
        />
      </ListItemButton>
    </Stack>
  );
}
