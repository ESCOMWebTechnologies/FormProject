import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "../scss/styles.scss";
import * as bootstrap from "bootstrap";

import { DataContextProvider } from "./Context/DataContext.jsx";
import Home from "./Components/Home.jsx";
import ErrorPage from "./Components/ErrorPage.jsx";
import SignIn from "./Components/SignIn.jsx";
import CreateAccount from "./Components/CreateAccount.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "SignIn",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "CreateAccount",
    element: <CreateAccount />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("App")).render(
  <React.StrictMode>
    <DataContextProvider>
        <RouterProvider router={router} />
    </DataContextProvider>
  </React.StrictMode>
);
