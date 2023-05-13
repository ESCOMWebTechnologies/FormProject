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
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-1 mb-1 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0 ms-4">
          <span className="fs-6">Easy Creator Forms</span>
        </div>
        <div className="col-md-6 text-end">
          <ul className="nav col-12 col-md-auto mb-1 justify-content-end mb-md-0">
            <li className="me-4">
              <Link to={"/"} className="nav-link text-secondary" >
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
                className="flex-shrink-0 dropdown ms-1"
              >
                <DropdownToggle
                  className="d-block link-dark text-decoration-none dropdown-toggle show"
                  style={{ backgroundColor: "white", border: "0" }}
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width="20"
                    height="20"
                    className="rounded-circle"
                  />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu text-small">
                  <DropdownItem header>Profile</DropdownItem>
                  <DropdownItem >
                    <Link to={"/SignUp"} className="dropdown-item">
                      Sign Up
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={"/LogIn"} className="dropdown-item">
                      Log In
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
            <li className="me-4">
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
                    size="20"
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
          <li className="me-4">
            <GrTwitter className="bi" size="15" />
          </li>
          <li className="me-4">
            <GrInstagram className="bi" size="15" />
          </li>
          <li className="me-4">
            <GrFacebookOption className="bi " size="15" />
          </li>
        </ul>
      </footer>
    </>
  );
}

//Se exporta el componente Home
export default Home;
