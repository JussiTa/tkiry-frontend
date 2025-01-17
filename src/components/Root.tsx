import { ErrorBoundary } from "react-error-boundary";
import { ErrorAlert } from "./ErrorAlert";

export const Root = () => {
  return <ErrorBoundary fallback={<ErrorAlert />}></ErrorBoundary>;
};
