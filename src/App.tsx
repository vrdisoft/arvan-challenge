import React, { useReducer, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./page/login";
import LazyArticles from "./page/articles";
import LazyNewArticle from "./page/newArticle";
import { useToken } from "./context/tokenContext";
import "./App.scss";
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
                  <Suspense fallback={<div>Loading...</div>}>
                    <LazyArticles />
                  </Suspense>
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
            <Route
              path="/articles/page"
              element={
                isLoggedIn ? (
                  <Suspense fallback={<div>Loading...</div>}>
                    <LazyArticles />
                  </Suspense>
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
            <Route
              path="/articles/create"
              element={
                isLoggedIn ? (
                  <Suspense fallback={<div>Loading...</div>}>
                    <LazyNewArticle />
                  </Suspense>
                ) : (
                  <Navigate to="/login" replace={true} />
                )
              }
            />
            <Route
              path="/articles/edit"
              element={
                isLoggedIn ? (
                  <Suspense fallback={<div>Loading...</div>}>
                    <LazyNewArticle />
                  </Suspense>
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
