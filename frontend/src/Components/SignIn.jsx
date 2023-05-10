import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { DataContext } from "../Context/DataContext.jsx";

function SignIn() {

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(loginUser(user,password)){
      alert("Welcome");
      setUser("");
      setPassword("");
    }
    else{
      alert("The user/email or password are incorrect");
      setPassword("");
    }
  };

  return (
    <>
      <Outlet />
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
    </>
  );
}

export default SignIn;
