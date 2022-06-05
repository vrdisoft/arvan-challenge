import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TokenProvider } from "./context/tokenContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <TokenProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TokenProvider>
);
