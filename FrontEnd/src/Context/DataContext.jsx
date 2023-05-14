import React, { createContext, useState } from "react";

export const DataContext = createContext();

export function DataContextProvider(props) {
  const [emailAddress, setEmail] = useState("");
  const [userName, setUser] = useState("");
  const [passwordToken, setPassword] = useState("");

  function createAccount(email, user, password) {
    setEmail(email);
    setUser(user);
    setPassword(password);
  }
  function loginUser(user, password) {
    setUser(user);
    setPassword(password);
  }

  return (
    <DataContext.Provider
      value={{
        emailAddress,
        userName,
        passwordToken,
        createAccount,
        loginUser,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
