import React, { createContext, useContext } from "react";
import { AppStateType } from "../stateManager/reducer";

const AppStateContext = createContext({});

const useAppState = () => {
  const appState = useContext(AppStateContext) as AppStateType;
  return appState;
};

type Props = {
  children?: React.ReactNode;
  state: AppStateType;
};
const ProviderStateArticle: React.FC<Props> = ({ state, ...rest }) => {
  const appState = React.useMemo(
    () => state,
    [state.alertMessage, state.reload]
  );
  return <AppStateContext.Provider value={appState} {...rest} />;
};

export { ProviderStateArticle, useAppState };
