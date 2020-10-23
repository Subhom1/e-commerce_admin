import { combineReducers } from "redux";
import authReducer from "../auth/auth.reducer";
import uiReducer from "./uiReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});
export default rootReducer;
