import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/router.tsx";
import { AuthProvider } from "./features/auth/providers/auth-provider.tsx";
import App from "./App.tsx";
import React from "react";
import { Footer } from "./components/Footer.tsx";
import { Header } from "./components/Header.tsx";
// Create a client
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <RouterProvider router={router}></RouterProvider>
        <Footer />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
