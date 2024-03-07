import { MenuItem, Stack } from "@mui/material";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ControlledTextField from "../../../components/ControlledTextField/ControlledTextField";
import FilterIconButton from "../../../components/FilterIconButton/FilterIconButton";

type ArtworkListFilterProps = {
  yearOptions: number[];
};

export default function ArtworkListFilter({
  yearOptions,
}: ArtworkListFilterProps) {
  const { t } = useTranslation();

  const filters = useWatch();
  const appliedFilters = useMemo(
    () => Object.values(filters).filter((item) => !!item).length,
    [filters]
  );

  // TODO: filter by tag
  // TODO: filter by town

  return (
    <FilterIconButton
      edge="end"
      badgeProps={{
        variant: "dot",
        badgeContent: appliedFilters,
        invisible: appliedFilters === 0,
        color: "primary",
      }}
    >
      <Stack px={2} spacing={2}>
        <ControlledTextField
          select
          size="small"
          defaultValue=""
          label={t("Year")}
          fullWidth
          name="year"
          // TODO: show empty value
          // SelectProps={{
          //   displayEmpty: true,
          // }}
          // InputLabelProps={{
          //   shrink: true,
          // }}
        >
          <MenuItem value="">{t("All")}</MenuItem>
          {yearOptions.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </ControlledTextField>
        {/* TODO: add clear button */}
        {/* <Stack direction="row">
          <Button>Clear</Button>
        </Stack> */}
      </Stack>
    </FilterIconButton>
  );
}
