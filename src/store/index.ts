import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import globalReducer from "./reducers/globalReducer";

const rootReducer = combineReducers({
  global: globalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools());

export default store;
