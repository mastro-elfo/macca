import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { deburr } from "lodash";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useDebounce from "../../services/useDebounce";
type SearchfieldProps = Omit<
  TextFieldProps,
  "children" | "onChange" | "select"
> & {
  onSearch?: (deburred: string, clean: string) => void;
};

export default function SearchField({
  defaultValue,
  InputProps,
  onSearch,
  ...props
}: SearchfieldProps) {
  const { t } = useTranslation();

  const [value, setValue] = useState<string>(
    typeof defaultValue === "string" ? defaultValue : ""
  );

  useDebounce<{ deburred: string; clean: string }>(
    useCallback(
      (data: { deburred: string; clean: string }) =>
        onSearch?.(data.deburred, data.clean),
      [onSearch]
    ),
    useMemo(() => ({ deburred: deburr(value), clean: value }), [value]),
    value ? 250 : 20
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const handleCancel = () => {
    setValue("");
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" title={t("Clear")} onClick={handleCancel}>
              <CancelIcon />
            </IconButton>
          </InputAdornment>
        ),
        ...InputProps,
      }}
      {...props}
    />
  );
}
