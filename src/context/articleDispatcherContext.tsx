import React, { createContext, useContext } from "react";
import { ActinType } from "../stateManager/reducer";

const DispatcherContext = createContext({});

const useDispatch = () => {
  const appDispatcher = useContext(
    DispatcherContext
  ) as React.Dispatch<ActinType>;
  return appDispatcher;
};

type Props = {
  children?: React.ReactNode;
  dispatch: React.Dispatch<ActinType>;
};

const ProviderDispatchArticle: React.FC<Props> = ({ dispatch, ...rest }) => {
  const dispatcher = React.useMemo(() => dispatch, [dispatch]);
  return <DispatcherContext.Provider value={dispatcher} {...rest} />;
};
export { ProviderDispatchArticle, useDispatch };
