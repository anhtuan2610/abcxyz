import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId="554247031538-0ce3hb0gas3bcl8ul5qrirefpqb2cvks.apps.googleusercontent.com">
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: { padding: "20px" },
          }}
        />
        <AppRouter />
      </QueryClientProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
