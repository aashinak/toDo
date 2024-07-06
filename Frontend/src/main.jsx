import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./pages/Error.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Protected from "./components/AuthLayout.jsx";
import Home from "./pages/Home.jsx";
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/login",
        element: <Protected authentication={false}><Login /></Protected> ,
      },
      {
        path: "/signup",
        element: <Protected authentication={false}><SignUp /></Protected>,
      },  
      {
        path: "/",
        element: <Protected authentication><Home/></Protected> ,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
