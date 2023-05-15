//Importacion del componente React y useState
import React, { useState, useContext } from "react";

//Importacion del componente Link que sirve para redirigir a los demas componentes con el browserRouter
import { Link, Outlet, useLocation } from "react-router-dom";

//Importacion de componentes para realizar un menu desplegable
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

//Importacion de iconos de Bootstrap
import {
  BsFillHouseDoorFill,
  BsFillSunFill,
  BsFillMoonFill,
  BsFillBrightnessAltHighFill,
} from "react-icons/bs";

//Importacion de iconos de Grommet-Icons
import { GrFacebookOption, GrTwitter, GrInstagram } from "react-icons/gr";

//Importacion del contexto
import { DataContext } from "../Context/DataContext.jsx";

//Se crea la funcion Home
function Home() {
  //Se llama a una variable del contexto
  const { imagePath } = useContext(DataContext);

  //Se crean los estados del menu desplegable para saber si esta abierto o cerrado
  const [dropDawn, setDropDawn] = useState(false);
  const [dropDawn2, setDropDawn2] = useState(false);

  //Se crean las funciones para invertir los valores de abierto y cerrado del menu desplegable
  const openDropDawn = () => {
    setDropDawn(!dropDawn);
  };
  const openDropDawn2 = () => {
    setDropDawn2(!dropDawn2);
  };

  //Elemento a cargar en el cuerpo de la pagina dependiendo de la ubicacvion del usuario
  const { pathname } = useLocation();
  const childsToRender = () => {
    if (pathname === "/FormProject/") {
      return (
        <div className="container marketing mb-3 mt-5">
          <div className="row me-5 ms-5">
            <div className="col-lg-4">
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="100"
                height="100"
                className="bd-placeholder-img rounded-circle mb-"
              />
              <h2 className="fw-normal">Bisogno gandarilla Ricardo</h2>
              <p>Front-End developer.</p>
            </div>
            <div className="col-lg-4">
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="100"
                height="100"
                className="bd-placeholder-img rounded-circle mb-3"
              />
              <h2 className="fw-normal">Ulrich Tamayo Daniel</h2>
              <p>Back-End developer.</p>
            </div>
            <div className="col-lg-4">
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="100"
                height="100"
                className="bd-placeholder-img rounded-circle mb-3"
              />
              <h2 className="fw-normal">Ruiz Salgado Nayeli Adriana</h2>
              <p>Database developer.</p>
            </div>
          </div>
        </div>
      );
    } else {
      return <Outlet />;
    }
  };

  //cuando se manda a llamar al componente Home se retorna la pagina web
  return (
    <>
      <header className="d-flex flex-wrap align-items-center justify-content-md-between justify-content-center border-bottom">
        <div className="col-md-3 mb-md-0 ms-5 me-5 mb-3">
          <span className="fs-6">Easy Creator Forms</span>
        </div>
        <div className="col-md-5 text-end ms-5 mb-2 mt-2">
          <ul className="nav col-12 col-md-auto justify-content-end">
            <li className="me-4">
              <Link
                //to={"/"}
                to={"/FormProject/"}
                className="nav-link text-secondary"
              >
                <BsFillHouseDoorFill
                  className="bi d-block mx-auto mb-1"
                  size="15"
                />
                <small>Home</small>
              </Link>
            </li>
            <li className="me-4">
              <Dropdown
                isOpen={dropDawn}
                toggle={openDropDawn}
                direction="down"
              >
                <DropdownToggle
                  className="d-block link-dark text-decoration-none dropdown-toggle show"
                  style={{ backgroundColor: "white", border: "0" }}
                >
                  <img
                    src={imagePath}
                    alt="mdo"
                    width="20"
                    height="20"
                    className="rounded-circle"
                  />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end shadow" end>
                  <DropdownItem header>
                    <small>Profile</small>
                  </DropdownItem>
                  <DropdownItem>
                    <small>
                      <Link
                        //to={"/SignUp"}
                        to={"/FormProject/SignUp/"}
                        className="dropdown-item d-flex align-items-center"
                      >
                        Sign Up
                      </Link>
                    </small>
                  </DropdownItem>
                  <DropdownItem>
                    <small>
                      <Link
                        //to={"/LogIn"}
                        to={"/FormProject/LogIn/"}
                        className="dropdown-item d-flex align-items-center"
                      >
                        Log In
                      </Link>
                    </small>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
            <li className="me-4">
              <Dropdown
                isOpen={dropDawn2}
                toggle={openDropDawn2}
                direction="down"
              >
                <DropdownToggle
                  className="d-block link-dark text-decoration-none dropdown-toggle show"
                  style={{ backgroundColor: "white", border: "0" }}
                >
                  <BsFillBrightnessAltHighFill
                    className="rounded-circle"
                    size="20"
                  />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end shadow" end>
                  <DropdownItem header>
                    <small>Theme</small>
                  </DropdownItem>
                  <DropdownItem
                    className="dropdown-item d-flex align-items-center"
                    data-bs-theme-value="light"
                    aria-pressed="false"
                    disabled
                  >
                    <small>
                      <BsFillSunFill className="bi me-2 opacity-50 theme-icon" />
                      Light (Disabled)
                    </small>
                  </DropdownItem>
                  <DropdownItem
                    className="dropdown-item d-flex align-items-center"
                    data-bs-theme-value="dark"
                    aria-pressed="false"
                    disabled
                  >
                    <small>
                      <BsFillMoonFill className="bi me-2 opacity-50 theme-icon" />
                      Dark (Disabled)
                    </small>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </header>

      <article>{childsToRender()}</article>

      <footer className="d-flex flex-wrap align-items-center justify-content-md-between justify-content-center border-top">
        <div className="col-md-3 mb-md-0 ms-5 me-5 mt-1">
          <span className="text-body-secondary">© 2023 Company, Inc</span>
        </div>
        <ul className="nav col-4 col-md-auto justify-content-end mt-1 me-4">
          <li>
            <GrTwitter className="bi" size="15" />
          </li>
          <li className="me-4 ms-4">
            <GrInstagram className="bi" size="15" />
          </li>
          <li>
            <GrFacebookOption className="bi " size="15" />
          </li>
        </ul>
      </footer>
    </>
  );
}

//Se exporta el componente Home
export default Home;
