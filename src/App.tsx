import React, { useReducer } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./page/login";
import Articles from "./page/articles";
import NewArticle from "./page/newArticle";
import { useToken } from "./context/tokenContext";
import "./App.sass";
import { ProviderDispatchArticle } from "./context/articleDispatcherContext";
import { ProviderStateArticle } from "./context/articleStateContext";
import { reducer, INIT_STATE } from "./stateManager/reducer";

function App() {
  const { isLoggedIn } = useToken();
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  return (
    <ProviderDispatchArticle dispatch={dispatch}>
      <ProviderStateArticle state={state}>
        <div className="app-continer">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Login />} />
            <Route
              path="/articles"
              element={
                isLoggedIn ? (
                  <Articles />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
            <Route
              path="/articles/create"
              element={
                isLoggedIn ? (
                  <NewArticle />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
            <Route
              path="/articles/edit"
              element={
                isLoggedIn ? (
                  <NewArticle />
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
            <Route path="*" element={<Navigate to="/login" replace={true} />} />
          </Routes>
        </div>
      </ProviderStateArticle>
    </ProviderDispatchArticle>
  );
}

export default App;
