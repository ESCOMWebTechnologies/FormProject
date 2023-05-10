import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <header>
        <div>
          Easy Creator Forms
          <nav>
            <Link to={"/"}> Home</Link>
            <Link to={"/CreateAccount"}> Create Acoount</Link>
            <Link to={"/SignIn"}> Sing in</Link>
          </nav>
        </div>
      </header>
      <article>
        <div>Imagen de fondo y escritura</div>
      </article>
      <footer>Descripcion de la compañia</footer>
    </>
  );
}

export default Home;
