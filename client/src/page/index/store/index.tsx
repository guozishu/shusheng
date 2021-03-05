import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// import { systemReducer } from "./system/reducers";
// import { chatReducer } from "./chat/reducers";

import { enthusiasm } from '../reducers/index';

const rootReducer = combineReducers({
    enthusiasm
});

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
