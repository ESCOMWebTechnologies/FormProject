
//Importacion del componente React
import React from "react";

//Importacion del componente useRouteError
import { useRouteError } from "react-router-dom";

//Importacion del componente Link que sirve para redirigir a los demas componentes con el browserRouter
import { Link } from "react-router-dom";

//Se crea la funcion ErrorPage
function ErrorPage() {

  //Se crea un objeto useRouteError
  const error = useRouteError();

  //Se imprime en consola el error obtenido
  console.error(error);

  //cuando se manda a llaamar al componente Home se retorna la pagina web
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold text-body-emphasis">Oops!</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Sorry, an unexpected error has occurred.
          <br />
          <br />
          <i>{error.statusText || error.message}</i>
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to={"/"} className="btn btn-outline-primary btn-lg" role="button">Home</Link>
        </div>
      </div>
    </div>
  );
}

//Se exporta el componente ErrorPage
export default ErrorPage;
