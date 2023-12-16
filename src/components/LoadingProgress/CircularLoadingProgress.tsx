import { CircularProgress, CircularProgressProps } from "@mui/material";

type CircularLoadingProgressProps = CircularProgressProps & {
  loading?: boolean;
};

export default function CircularLoadingProgress({
  loading,
  ...props
}: CircularLoadingProgressProps) {
  if (!loading) return null;
  return <CircularProgress {...props} />;
}
