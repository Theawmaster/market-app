import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { createStore } from "redux";
import { rootReducer } from "./redux/rootReducer";

const finalReducer = combineReducers({
  rootReducer: rootReducer,
});

const initialState = {
    rootReducer: {
      cartItems : localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

const store = createStore(finalReducer, initialState);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
