import React, { useReducer, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import routes from "./config/routes";
import * as paths from "./config/paths";
import { useToken } from "./context/tokenContext";
import "./App.scss";
import { ProviderDispatchArticle } from "./context/articleDispatcherContext";
import { ProviderStateArticle } from "./context/articleStateContext";
import { reducer, INIT_STATE } from "./stateManager/reducer";
import Layout from "./layout";

function App() {
  const { isLoggedIn } = useToken();
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  return (
    <ProviderDispatchArticle dispatch={dispatch}>
      <ProviderStateArticle state={state}>
        <div className="app-continer">
          <Routes>
            {routes.map((item) => {
              if (item.mustBeLogin) {
                return (
                  <Route
                    key={item.title}
                    path={item.path}
                    element={
                      isLoggedIn ? (
                        <Layout component={item.component} />
                      ) : (
                        <Navigate to={paths.LOGIN} replace={true} />
                      )
                    }
                  />
                );
              } else {
                return (
                  <Route
                    key={item.title}
                    path={item.path}
                    element={React.createElement(item.component)}
                  />
                );
              }
            })}
            <Route
              path="*"
              element={<Navigate to={paths.LOGIN} replace={true} />}
            />
          </Routes>
        </div>
      </ProviderStateArticle>
    </ProviderDispatchArticle>
  );
}

export default App;
