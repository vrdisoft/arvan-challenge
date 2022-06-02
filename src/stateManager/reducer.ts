import { ACTIONS } from "./actionCreator";

export type AppStateType = {
  reload: boolean;
  alertMessage: string;
};

export type ActinType = {
  type: string;
  payload?: any;
};

export const INIT_STATE: AppStateType = {
  reload: false,
  alertMessage: "",
};

function handleDeleteArticles(state: AppStateType, payload: any) {
  return {
    ...state,
    reload: !state.reload,
    alertMessage: payload.alertMessage,
  };
}

function handleCreateArticles(state: AppStateType, payload: any) {
  return { ...state, alertMessage: payload.alertMessage };
}

function handleEditArticles(state: AppStateType, payload: any) {
  return { ...state, alertMessage: payload.alertMessage };
}

function handleClearAlertMessage(state: AppStateType, payload: any) {
  return { ...state, alertMessage: payload.alertMessage };
}

const ACTION_HANDLERS = {
  [ACTIONS.DELETE_ARRICLES]: handleDeleteArticles,
  [ACTIONS.CREATE_ARRICLES]: handleCreateArticles,
  [ACTIONS.EDIT_ARRICLES]: handleEditArticles,
  [ACTIONS.CLEAR_ALERT_MESSAGE]: handleClearAlertMessage,
};

export function reducer(state: AppStateType, action: ActinType) {
  return (ACTION_HANDLERS[action.type] || (() => state))(state, action.payload);
}
