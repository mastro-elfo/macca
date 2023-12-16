import { ComponentProps } from "react";
import CircularLoadingProgress from "./CircularLoadingProgress";
import LinearLoadingProgress from "./LinearLoadingProgress";

type LoadingProgressProps =
  | ({
      variant?: "linear";
    } & Omit<ComponentProps<typeof LinearLoadingProgress>, "variant">)
  | ({ variant: "circular" } & Omit<
      ComponentProps<typeof CircularLoadingProgress>,
      "variant"
    >);

export default function LoadingProgress({
  variant = "linear",
  ...props
}: LoadingProgressProps) {
  if (variant === "linear") return <LinearLoadingProgress {...props} />;
  return <CircularLoadingProgress {...props} />;
}
