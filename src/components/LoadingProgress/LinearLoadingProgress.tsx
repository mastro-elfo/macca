import { LinearProgress, LinearProgressProps } from "@mui/material";

type LinearLoadingProgressProps = LinearProgressProps & {
  loading?: boolean;
};

export default function LinearLoadingProgress({
  loading,
  ...props
}: LinearLoadingProgressProps) {
  if (!loading) return null;
  return <LinearProgress {...props} />;
}
