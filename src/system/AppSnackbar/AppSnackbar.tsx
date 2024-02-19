import { SnackbarProvider, useSnackbar, VariantType } from "notistack";
import { createContext, PropsWithChildren, useContext } from "react";

export default function AppSnackbar({ children }: PropsWithChildren) {
  return (
    <SnackbarProvider>
      <MessageProvider>{children}</MessageProvider>
    </SnackbarProvider>
  );
}

function defaultCallback(message: string, variant: VariantType) {
  console.warn("Message call outside of MessageProvider", message, variant);
}

const Context = createContext({
  log: defaultCallback,
  success: (message: string) => {
    defaultCallback(message, "success");
  },
  info: (message: string) => {
    defaultCallback(message, "info");
  },
  warning: (message: string) => {
    defaultCallback(message, "warning");
  },
  error: (message: string) => {
    defaultCallback(message, "error");
  },
});

export function useAppSnackbar() {
  return useContext(Context);
}

function MessageProvider({ children }: PropsWithChildren) {
  const { enqueueSnackbar } = useSnackbar();

  const log = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  };
  const success = (message: string) => {
    log(message, "success");
  };
  const info = (message: string) => {
    log(message, "info");
  };
  const warning = (message: string) => {
    log(message, "warning");
  };
  const error = (message: string) => {
    log(message, "error");
  };

  return (
    <Context.Provider value={{ log, success, info, warning, error }}>
      {children}
    </Context.Provider>
  );
}
