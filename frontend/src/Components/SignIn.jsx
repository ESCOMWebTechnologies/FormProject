import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { GrFacebookOption, GrTwitter, GrInstagram } from "react-icons/gr";

import { DataContext } from "../Context/DataContext.jsx";

function SignIn() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(DataContext);

  const [dropDawn, setDropDawn] = useState(false);
  const openDropDawn = () => {
    setDropDawn(!dropDawn);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginUser(user, password)) {
      alert("Welcome");
      setUser("");
      setPassword("");
    } else {
      alert("The user/email or password are incorrect");
      setPassword("");
    }
  };

  return (
    <>
      <Outlet />
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0 ms-4">
          <span className="fs-4">Easy Creator Forms</span>
        </div>
        <div className="col-md-3 text-end">
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to={"/"} className="nav-link text-secondary">
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
                  <DropdownItem>
                    <Link to={"/CreateAccount"} className="dropdown-item">
                      Sign-up
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to={"/SignIn"} className="dropdown-item">
                      Sign-in
                    </Link>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <Link to={"/SignOut"} className="dropdown-item">
                      Sign-out
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </header>

      <article>
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <input
              type="text"
              placeholder="User name or email adress"
              required
              value={user}
              autoFocus
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
            <br />
            <br />
            <input
              type="password"
              placeholder="New Password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
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

export default SignIn;
