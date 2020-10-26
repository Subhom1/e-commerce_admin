import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import { logger } from "redux-logger";
const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return composeEnhancers(applyMiddleware(...middleware));
  } else {
    applyMiddleware(...middleware);
  }
};
const composeEnhancersMiddlewares = bindMiddleware([thunk, logger]);

export const store = createStore(rootReducer, composeEnhancersMiddlewares);
