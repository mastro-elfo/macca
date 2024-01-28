import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { HashRouter as Router } from "react-router-dom";
import "./i18n";
import FallbackLayout from "./layouts/FallbackLayout/FallbackLayout";
import useDocumentLang from "./services/useDocumentLang";
import AppLocalizationProvider from "./system/AppLocalizationProvider/AppLocalizationProvider";
import AppQuery from "./system/AppQuery/AppQuery";
import { AppRoutes } from "./system/AppRoutes";
import AppSnackbar from "./system/AppSnackbar/AppSnackbar";
import AppTheme from "./system/AppTheme/AppTheme";
import ErrorBoundary from "./system/ErrorBoundary/ErrorBoundary";

export default function App() {
  const { i18n } = useTranslation();
  useDocumentLang(i18n.language);

  return (
    <AppTheme>
      <ErrorBoundary>
        <AppQuery>
          <AppSnackbar>
            <Suspense fallback={<FallbackLayout />}>
              <Router>
                <AppLocalizationProvider>
                  <AppRoutes />
                </AppLocalizationProvider>
              </Router>
            </Suspense>
          </AppSnackbar>
        </AppQuery>
      </ErrorBoundary>
    </AppTheme>
  );
}
