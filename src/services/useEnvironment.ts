export default function useEnvironment() {
  const isDevelopment = import.meta.env.DEV;
  const isProduction = import.meta.env.PROD;
  const mode = import.meta.env.MODE;

  const backendUrl: string = import.meta.env.VITE_BACKEND_URL;
  const documentTitlePrefix: string =
    import.meta.env.VITE_DOCUMENT_TITLE_PREFIX ?? "";

  const logDebug: boolean =
    (import.meta.env.VITE_LOG_DEBUG ?? "").toLowerCase() === "true";
  const logInfo: boolean =
    (import.meta.env.VITE_LOG_INFO ?? "").toLowerCase() === "true";
  const logWarning: boolean =
    (import.meta.env.VITE_LOG_WARNING ?? "").toLowerCase() === "true";
  const logError: boolean =
    (import.meta.env.VITE_LOG_ERROR ?? "").toLowerCase() === "true";

  return {
    isDevelopment,
    isProduction,
    mode,
    backendUrl,
    documentTitlePrefix,
    logDebug,
    logInfo,
    logWarning,
    logError,
  };
}
