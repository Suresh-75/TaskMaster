import { StrictMode } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import Dashboard from "./Dashboard.jsx";
import Tasklist from "./Tasklist.jsx";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
// require("dotenv").config();
import { config } from "dotenv";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Theme>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Tasklist" element={<Tasklist />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </Theme>
    </BrowserRouter>
  </StrictMode>
);
