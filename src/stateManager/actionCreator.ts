export const ACTIONS = {
  DELETE_ARRICLES: "DELETE_ARRICLES",
};

export const deleteArticles = (data?: any) => ({
  type: ACTIONS.DELETE_ARRICLES,
  payload: data,
});
