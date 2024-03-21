import "./App.css";
import { Unauthenticated } from "./unauthenticated-app";
import { useAuth } from "./context/auth-context";
import { Authenticated } from "./authenticated-app";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageErrorFallBack } from "./components/lib";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallBack}>
        {user ? <Authenticated /> : <Unauthenticated />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
