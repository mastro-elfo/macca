export default function useEnvironment() {
  const isDevelopment = import.meta.env.DEV;
  const isProduction = import.meta.env.PROD;
  const mode = import.meta.env.MODE;

  const backendUrl = String(import.meta.env.VITE_BACKEND_URL);
  const documentTitlePrefix = String(
    import.meta.env.VITE_DOCUMENT_TITLE_PREFIX
  );

  const logDebug: boolean =
    String(import.meta.env.VITE_LOG_DEBUG).toLowerCase() === "true";
  const logInfo: boolean =
    String(import.meta.env.VITE_LOG_INFO).toLowerCase() === "true";
  const logWarning: boolean =
    String(import.meta.env.VITE_LOG_WARNING).toLowerCase() === "true";
  const logError: boolean =
    String(import.meta.env.VITE_LOG_ERROR).toLowerCase() === "true";

  const i18nExpirationTime =
    Number(import.meta.env.VITE_I18N_EXPIRATION_TIME) || 86400000;

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
    i18nExpirationTime,
  };
}
