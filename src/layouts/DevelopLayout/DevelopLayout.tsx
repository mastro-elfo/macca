import { PropsWithChildren } from "react";
import useEnvironment from "../../services/useEnvironment";

type DevelopLayoutProps = PropsWithChildren;

export default function DevelopLayout({ children }: DevelopLayoutProps) {
  const { isDevelopment } = useEnvironment();
  if (!isDevelopment) return null;
  return <>{children}</>;
}
