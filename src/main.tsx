import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { AuthProvider } from "./features/auth/providers/auth-provider.tsx";
import App from "./App.tsx";
import React from "react";
import { Footer } from "./components/Footer.tsx";
import { Header } from "./components/Header.tsx";
import { Logout } from "./components/Logout.tsx";
import { LoginForm } from "./components/LoginForm.tsx";
import { CreateLotList } from "./components/CreateLotList.tsx";
import { Payments } from "./components/Payments.tsx";
import { Success } from "./components/Success.tsx";
import { Cancel } from "./components/Cancel.tsx";
import { LotListWithCustomer } from "./components/LotList.tsx";
import { ListDocument } from "./components/ListDocument.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Header />
        <Router>
          <Routes>
            <Route path={"/logout"} element={<Logout />} />
            <Route path={"/login"} element={<LoginForm />} />
            <Route path={"/createList"} element={<CreateLotList />} />
            <Route path={"/lotlist"} element={<LotListWithCustomer />} />
            <Route path={"/listDocument"} element={<ListDocument />} />
          </Routes>
        </Router>
      </AuthProvider>

      <Router>
        <Routes>
          <Route path={"/"} element={<App />} />
          <Route path={"/payments"} element={<Payments />} />
          <Route path={"/success"} element={<Success />} />
          <Route path={"/cancel"} element={<Cancel />} />
        </Routes>
      </Router>
      <Footer />
    </QueryClientProvider>
  </React.StrictMode>
);
