import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Basic from "./pages/basic/basic";
import Customization from "./pages/customization/customization";
import Others from "./pages/others/others";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Basic />} />
      <Route path="/customization" element={<Customization />} />
      <Route path="/others" element={<Others />} />
    </Routes>
  );
}

export default App;
