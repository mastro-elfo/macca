import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";

export default function useMarkdownTranslation(namespace: string) {
  const {
    i18n: { language },
  } = useTranslation();
  const compact = language.substring(0, 2);
  return useQuery({
    queryKey: ["public", "locales", namespace],
    queryFn: ({ signal }) =>
      axios
        .get(`/macca/locales/${compact}/${namespace}`, {
          signal,
          headers: {
            "Content-Type": "text/markdown",
          },
        })
        .then((response) => response.data),
  });
}
