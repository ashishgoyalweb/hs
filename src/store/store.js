import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

let composeEnhancers = compose;
if (process.env.NODE_ENV !== "production") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const enhancer = composeEnhancers(applyMiddleware(reduxThunk));

const store = createStore(reducers, {}, enhancer);

export default store;
