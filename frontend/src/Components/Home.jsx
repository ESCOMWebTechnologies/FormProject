//Importacion del componente React y useState
import React, { useState } from "react";

//Importacion del componente Link que sirve para redirigir a los demas componentes con el browserRouter
import { Link, Outlet } from "react-router-dom";

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

//Se crea la funcion Home
function Home() {
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

  //cuando se manda a llaamar al componente Home se retorna la pagina web
  return (
    <>
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0 ms-4">
          <span className="fs-4">Easy Creator Forms</span>
        </div>
        <div className="col-md-3 text-end">
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to={"/"} className="nav-link text-secondary" >
                <BsFillHouseDoorFill
                  className="bi d-block mx-auto mb-1"
                  size="25"
                />
                Home
              </Link>
            </li>
            <li>
              <Dropdown
                isOpen={dropDawn}
                toggle={openDropDawn}
                className="flex-shrink-0 dropdown ms-1"
              >
                <DropdownToggle
                  className="d-block link-dark text-decoration-none dropdown-toggle show"
                  style={{ backgroundColor: "white", border: "0" }}
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width="32"
                    height="32"
                    className="rounded-circle"
                  />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu text-small shadow">
                  <DropdownItem header>Profile</DropdownItem>
                  <DropdownItem >
                    <Link to={"/SignUp"} className="dropdown-item">
                      Sign Up
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={"/SignIn"} className="dropdown-item">
                      Sign In
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
            <li>
              <Dropdown
                isOpen={dropDawn2}
                toggle={openDropDawn2}
                className="flex-shrink-0 dropdown ms-1"
              >
                <DropdownToggle
                  className="d-block link-dark text-decoration-none dropdown-toggle show"
                  style={{ backgroundColor: "white", border: "0" }}
                >
                  <BsFillBrightnessAltHighFill
                    className="rounded-circle"
                    size="32"
                  />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu text-small shadow">
                  <DropdownItem header>Theme</DropdownItem>
                  <DropdownItem
                    className="dropdown-item d-flex align-items-center"
                    data-bs-theme-value="light"
                    aria-pressed="false"
                    disabled
                  >
                    <BsFillSunFill className="bi me-2 opacity-50 theme-icon" />
                    Light (Disabled)
                  </DropdownItem>
                  <DropdownItem
                    className="dropdown-item d-flex align-items-center"
                    data-bs-theme-value="dark"
                    aria-pressed="false"
                    disabled
                  >
                    <BsFillMoonFill className="bi me-2 opacity-50 theme-icon" />
                    Dark (Disabled)
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </header>

      <article>
        <Outlet />
      </article>

      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-body-secondary ms-3">
            © 2023 Company, Inc
          </span>
        </div>
        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="me-3">
            <GrTwitter className="bi" size="25" />
          </li>
          <li className="me-3">
            <GrInstagram className="bi" size="25" />
          </li>
          <li className="me-3">
            <GrFacebookOption className="bi " size="25" />
          </li>
        </ul>
      </footer>
    </>
  );
}

//Se exporta el componente Home
export default Home;
