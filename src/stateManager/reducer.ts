import { ACTIONS } from "./actionCreator";

export type AppStateType = {
  reload: boolean;
};

export type ActinType = {
  type: string;
  payload?: any;
};

export const INIT_STATE: AppStateType = {
  reload: false,
};

function handleDeleteArticles(state: AppStateType, payload: any) {
  return { ...state, reload: !state.reload };
}

const ACTION_HANDLERS = {
  [ACTIONS.DELETE_ARRICLES]: handleDeleteArticles,
};

export function reducer(state: AppStateType, action: ActinType) {
  return (ACTION_HANDLERS[action.type] || (() => state))(state, action.payload);
}
