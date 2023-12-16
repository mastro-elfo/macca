import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./i18n";
import FallbackLayout from "./layouts/FallbackLayout/FallbackLayout";
import AppLocalizationProvider from "./system/AppLocalizationProvider/AppLocalizationProvider";
import AppQuery from "./system/AppQuery/AppQuery";
import { AppRoutes } from "./system/AppRoutes";
import AppSnackbar from "./system/AppSnackbar/AppSnackbar";
import AppTheme from "./system/AppTheme/AppTheme";
import ErrorBoundary from "./system/ErrorBoundary/ErrorBoundary";

export default function App() {
  return (
    <AppTheme>
      <ErrorBoundary>
        <AppQuery>
          <AppSnackbar>
            <Suspense fallback={<FallbackLayout />}>
              <Router basename="macca">
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
