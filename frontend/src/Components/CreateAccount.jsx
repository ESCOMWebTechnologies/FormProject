import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { DataContext } from "../Context/DataContext.jsx";

function CreateAccount() {
  
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { createAccount } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      createAccount(email,user, password);
      setEmail("");
      setUser("");
      setPassword("");
      setPassword2("");
      alert("Succes create account...");
    } else {
      alert("The passwords didn't match...");
      setPassword("");
      setPassword2("");
    }
  };

  return (
    <>
      <Outlet />
      <header>
        <div>
          Easy Creator Forms
          <nav>
            <Link to={"/"}>Home</Link>
            <Link to={"/CreateAccount"}>Create Acoount</Link>
            <Link to={"/SignIn"}>Sing in</Link>
          </nav>
        </div>
      </header>
      <article>
        <div>
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="email"
              placeholder="Email adress"
              required
              value={email}
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="User name"
              required
              value={user}
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
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={password2}
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </article>
    </>
  );
}

export default CreateAccount;
