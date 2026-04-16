import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";
import LoginPage from "./components/loginPage.jsx";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import AdminStorePage from "./components/storeAdminPage.jsx";
import Testing from "./components/testing.jsx";

import BranchAccounts from "./pages/branchAccounts";
import Configuration from "./pages/configuration";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <App /> */}
        {/* <LoginPage /> */}
        {/* <AdminStorePage /> */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/dashboard" element={<Testing />}> */}
        <Route path="/dashboard" element={<AdminStorePage />}>
          <Route
            index
            element={
              <p className="flex justify-center">THIS IS THE MAIN CENTER</p>
            }
          />
          <Route path="branch-accounts" element={<BranchAccounts />} />
          <Route path="configuration" element={<Configuration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
