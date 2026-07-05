import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationProvider } from "./hooks/useNotify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </Router>,
);
