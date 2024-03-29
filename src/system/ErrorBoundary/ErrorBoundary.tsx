import HomeIcon from "@mui/icons-material/Home";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { TFunction } from "i18next";
import { Component, ErrorInfo, ReactNode } from "react";
import { withTranslation } from "react-i18next";

type Props = {
  children?: ReactNode;
  t: TFunction;
};

type State = {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      ...this.state,
      error,
      errorInfo,
      hasError: true,
    });
  }

  public render() {
    return (
      <>
        {!this.state.hasError && this.props.children}
        <Dialog open={this.state.hasError}>
          <DialogTitle>{this.state.error?.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.state.error?.message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              startIcon={<HomeIcon />}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              {this.props.t("Home")}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withTranslation()(ErrorBoundary);
