import "./App.css";

import { ErrorBoundary } from "react-error-boundary";
import { ErrorAlert } from "./components/ErrorAlert";
import { LotForm } from "./components/LotForm";

function App() {
  return (
    
    <ErrorBoundary fallback={<ErrorAlert />}>
      
      <LotForm />
    </ErrorBoundary>
  );
}

export default App;
