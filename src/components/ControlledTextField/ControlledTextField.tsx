import { TextField, TextFieldProps } from "@mui/material";
import { Controller } from "react-hook-form";

type ControlledTextFieldProps = Omit<TextFieldProps, "control" | "name"> & {
  name: string;
  onEnter?: () => void;
};

export default function ControlledTextField({
  name,
  onEnter,
  ...props
}: ControlledTextFieldProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...props}
          {...field}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          onKeyUp={(event) =>
            (event.code === "Enter" || event.code === "NumpadEnter") &&
            onEnter?.()
          }
        />
      )}
    />
  );
}
