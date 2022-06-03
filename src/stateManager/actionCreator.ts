export const ACTIONS = {
  DELETE_ARRICLES: "DELETE_ARRICLES",
  CREATE_ARRICLES: "CREATE_ARRICLES",
  EDIT_ARRICLES: "EDIT_ARRICLES",
  CLEAR_ALERT_MESSAGE: "CLEAR_ALERT_MESSAGE",
};

export const deleteArticles = (data?: any) => ({
  type: ACTIONS.DELETE_ARRICLES,
  payload: data,
});

export const createArticles = (data?: any) => ({
  type: ACTIONS.CREATE_ARRICLES,
  payload: data,
});

export const editArticles = (data?: any) => ({
  type: ACTIONS.EDIT_ARRICLES,
  payload: data,
});

export const clearAlertMessage = (data?: any) => ({
  type: ACTIONS.CLEAR_ALERT_MESSAGE,
  payload: data,
});
