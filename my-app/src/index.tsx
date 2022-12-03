import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import jwtDecode from 'jwt-decode';
import { AuthActionTypes, IUser } from './components/auth/store/types';
import http from "./http_common";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const token = localStorage.token;
if (token) {
  http.defaults.headers.common["Authorization"]=`Bearer ${token}`;
  const data = jwtDecode<IUser>(token);

  const user: IUser = {
    email: data.email,
    image: data.image
  }
  store.dispatch({ type: AuthActionTypes.LOGIN_SUCCESS, payload: user });
}

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

