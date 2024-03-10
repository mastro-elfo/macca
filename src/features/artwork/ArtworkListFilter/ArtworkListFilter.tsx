import { Button, MenuItem, Stack } from "@mui/material";
import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ControlledTextField from "../../../components/ControlledTextField/ControlledTextField";
import FilterIconButton from "../../../components/FilterIconButton/FilterIconButton";

type ArtworkListFilterProps = {
  townOptions: string[];
  yearOptions: number[];
};

export default function ArtworkListFilter({
  townOptions,
  yearOptions,
}: ArtworkListFilterProps) {
  const { t } = useTranslation();

  const filters = useWatch();
  const appliedFilters = useMemo(
    () => Object.values(filters).filter((item) => !!item).length,
    [filters]
  );

  const { reset } = useFormContext();

  // TODO: filter by tag

  const handleReset = () => {
    reset();
  };

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
          SelectProps={{
            displayEmpty: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        >
          <MenuItem value="">{t("All years")}</MenuItem>
          {yearOptions.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </ControlledTextField>

        <ControlledTextField
          name="town"
          select
          size="small"
          label={t("Town")}
          fullWidth
          SelectProps={{
            displayEmpty: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        >
          <MenuItem value="">{t("All towns")}</MenuItem>
          {townOptions.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </ControlledTextField>

        <Stack direction="row" justifyContent="flex-end">
          <Button title={t("Clear")} onClick={handleReset}>
            {t("Clear")}
          </Button>
        </Stack>
      </Stack>
    </FilterIconButton>
  );
}
