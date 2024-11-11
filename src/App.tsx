import "@/App.css";
import AppRoutes from "@/AppRoutes";
import React from "react";

const App: React.FC = () => {
  return (
    <div className="container m-auto p-3">
      <AppRoutes />
    </div>
  );
};

export default App;
