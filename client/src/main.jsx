import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import mainRoutes from "./Routers/mainRoutes";
import "animate.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={mainRoutes}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
