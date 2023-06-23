//Importacion del componente React
import React from "react";

//Importacion del componente createBrowserRouter y RouterProvider
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Importacion de bootstrap 5
import "../scss/styles.scss";
import * as bootstrap from "bootstrap";

//Importacion del contexto de la aplicacion web
import { DataContextProvider } from "./Context/DataContext.jsx";

//Importacion del componente Home
import Home from "./Components/Home.jsx";

//Importacion del componente ErrorPage
import ErrorPage from "./Components/ErrorPage.jsx";

//Importacion del componente SignIn
import LogIn from "./Components/LogIn.jsx";

import AnswerForm from "./Components/FormComponents/AnswerForm.jsx";

//Importacion del componente SignUp
import SignUp from "./Components/SignUp.jsx";
import MainMenu from "./Components/MainMenu.jsx";
import EditForm from "./Components/FormComponents/EditForm.jsx";
import CreateForm from "./Components/FormComponents/CreateForm.jsx";
import {createRoot} from "react-dom/client";

//Se crea el objeto BrowserRouter
const router = createBrowserRouter([
  {
    //path: "/",
    path: "/FormProject/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        //path: "LogIn",
        path: "/FormProject/LogIn/",
        element: <LogIn />,
      },
      {
        //path: "SignUp",EditForm
        path: "/FormProject/SignUp/",
        element: <SignUp />,
      },
      {
        path: "/FormProject/Forms/",
        element: <MainMenu />,
      },
      {
        path: "/FormProject/Forms/CreateForm/",
        element: <CreateForm />,
      },
      {
        path: "/FormProject/Forms/EditForm/:id",
        element: <EditForm />,
      },
      {
        path: "/FormProject/Forms/AnswerForm/:id",
        element: <AnswerForm />,
      },
    ],
  },
]);

//Se crea el objeto root y se renderiza en la pagina html donde se encuentra el id App
createRoot(document.getElementById("App")).render(
  <React.StrictMode>
    <DataContextProvider>
      <RouterProvider router={router}>
        <Home />
      </RouterProvider>
    </DataContextProvider>
  </React.StrictMode>
);