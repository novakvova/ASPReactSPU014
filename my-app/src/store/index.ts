import { authReducer } from './../components/auth/store/authReducer';
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    auth: authReducer
});

export const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk)));