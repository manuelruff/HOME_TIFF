import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import TasksPage from "./pages/TasksPage";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <HashRouter hashType="noslash">
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home/>} />
        <Route path="/tasks" element={<TasksPage/>} />
      </Route>
    </Routes>
  </HashRouter>
);
