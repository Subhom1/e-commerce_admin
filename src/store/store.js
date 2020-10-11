import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return composeEnhancers(applyMiddleware(...middleware));
  } else {
    applyMiddleware(...middleware);
  }
};
const composeEnhancersMiddlewares = bindMiddleware([thunk]);

export const Store = createStore(reducer, composeEnhancersMiddlewares);
