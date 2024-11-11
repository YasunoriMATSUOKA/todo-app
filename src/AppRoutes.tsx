import HomePageComponent from "@/components/pages/home/HomePage";
import TodosPageComponent from "@/components/pages/todos/TodosPage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter
      basename="/todo-app"
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path="/" element={<HomePageComponent />} />
        <Route path="/todos" element={<TodosPageComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
