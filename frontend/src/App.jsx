
//Importacion del componente React
import React from "react";

//Importacion del componente ReactDOM
import ReactDOM from "react-dom/client";

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

//Importacion del componente SignUp
import SignUp from "./Components/SignUp.jsx";

//Se crea el objeto BrowserRouter
const router = createBrowserRouter([
  {
    //path: "/",
    path: "/FormProject/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "LogIn",
        element: <LogIn />,
      },
      {
        path: "SignUp",
        element: <SignUp />,
      },
    ],
  },
]);

//Se crea el objeto root y se renderiza en la pagina html donde se encuentra el id App
ReactDOM.createRoot(document.getElementById("App")).render(

  //Se llama la herramienta de ayuda React.StrictMode
  <React.StrictMode>

    {/* Se manda a llamar el contexto para pasarlo a los hijos*/}
    <DataContextProvider>

        {/* Se manda a llamar el RouterProvider para hacer el ruteo a los diferentes sitios*/}
        <RouterProvider router={router} />
    </DataContextProvider>
  </React.StrictMode>
);
