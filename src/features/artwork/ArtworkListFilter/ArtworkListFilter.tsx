import { MenuItem, Stack } from "@mui/material";
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

  return (
    <FilterIconButton
      edge="end"
      badgeProps={{
        variant: "standard",
        badgeContent: 5,
        invisible: true,
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
        >
          <MenuItem value="">{t("All")}</MenuItem>
          {yearOptions.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </ControlledTextField>
        {/* <Stack direction="row">
          <Button>Clear</Button>
        </Stack> */}
      </Stack>
    </FilterIconButton>
  );
}
