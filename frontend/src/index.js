import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { routers } from "./utils/routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./ReduxStore/store.jsx";
const router = createBrowserRouter(routers);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        {/* Add Taostt Container */}
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
