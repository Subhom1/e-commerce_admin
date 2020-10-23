import authTypes from "./auth.types";
export const SET_CURRENT_USER = (user) => {
  return {
    type: authTypes.SET_CURRENT_USER,
    payload: user,
  };
};
