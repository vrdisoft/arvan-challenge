import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./page/login";
import Articles from "./page/articles";
import { useToken } from "./context/tokenContext";

function App() {
  const { isLoggedIn } = useToken();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Login />} />
      <Route
        path="/articles"
        element={
          isLoggedIn ? <Articles /> : <Navigate to="/login" replace={true} />
        }
      />
      <Route path="*" element={<Navigate to="/login" replace={true} />} />
    </Routes>
  );
}

export default App;
