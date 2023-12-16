import useEnvironment from "./useEnvironment";

export default function useDocumentTitle(title?: string | null) {
  const { documentTitlePrefix } = useEnvironment();
  document.title = `${documentTitlePrefix}${title ?? ""}`;
}
