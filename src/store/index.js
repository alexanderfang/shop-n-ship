import {
    applyMiddleware, 
    combineReducers, 
    createStore
} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import adminReducer from "./admin/reducer";
import authReducer from "./auth/reducer";
import cartReducer from "./cart/reducer";

const store = createStore(
  combineReducers({
    adminReducer,
    authReducer,
    cartReducer,
  }), 
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;