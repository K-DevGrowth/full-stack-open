import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { NotificationProvider } from "./hooks/useNotify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./hooks/useLoggedUser";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NotificationProvider>
    </QueryClientProvider>
  </Router>,
);
