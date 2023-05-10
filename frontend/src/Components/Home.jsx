import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown,DropdownItem,DropdownMenu,DropdownToggle } from "reactstrap";

function Home() {
  const [dropDawn, setDropDawn] = useState(false);
  const openDropDawn = () => {setDropDawn(!dropDawn)};
  return (
    <>
      <header>
        <div>
          Easy Creator Forms
          <nav>
            <Link to={"/"}> Home</Link>
          </nav>
          <Dropdown isOpen={dropDawn} toggle={openDropDawn}>
            <DropdownToggle caret className="btn btn-light text-dark me-2">
              <img
                src="https://github.com/mdo.png"
                alt="mdo"
                width="32"
                height="32"
                class="rounded-circle"
              />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <Link to={"/CreateAccount"}>Sign-up</Link>
              </DropdownItem>
              <DropdownItem>
                <Link to={"/SignIn"}> Sign-in</Link>
              </DropdownItem>
              <DropdownItem divider/>
              <DropdownItem>
                <Link to={"/SignOut"}> Sign-out</Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
