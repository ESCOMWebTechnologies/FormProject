
//Importacion del componente React, createContext y useState
import React, { createContext, useState } from "react";

//Se crea un contexto para la aplicacion web
export const DataContext = createContext();

//Se crea la funcion ContextProvider
export function DataContextProvider(props) {

  //Se crean los parametros necesarios paqra crear una cuenta
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  //Se crea la funcion signUp la cual sera la encargada de almacenar los valores ingresador por el usuario
  function signUp(name, lastName, user, password) {
    setName(name);
    setLastName(lastName);
    setUser(user);
    setPassword(password);
    createAccount();
  }

  //Se crea la funcion signIn la cual sera la encargada de almacenar los datos ingresador por el usuario
  function signIn(user, password) {
    setUser(user);
    setPassword(password);
    signInSession();
    //Se retorna el valor true/false si los datos ingresados son correctos
    return true;
  }

  function createAccount() {
    /*fetch("name"+"surname"+"username"+"password")
    fetch()
      .then((response) => response.text())
      .then((usuario) => {
        let ret = usuario.includes("yes");
        if (ret) {
          this.setState({ condition: true });
          alert("USUARIO VALIDO");
        } else {
          this.setState({ condition: false });
          alert("USUARIO NO VALIDO");
        }
      });*/
  }

  function signInSession() {
    /*fetch("name"+"surname"+"username"+"password")
    fetch()
      .then((response) => response.text())
      .then((usuario) => {
        let ret = usuario.includes("yes");
        if (ret) {
          this.setState({ condition: true });
          alert("USUARIO VALIDO");
        } else {
          this.setState({ condition: false });
          alert("USUARIO NO VALIDO");
        }
      });*/
  }

  //Se retorna el componente ContextProvider con las funciones y parametros antes indicados
  return (
    <DataContext.Provider
      value={{
        name,
        lastName,
        user,
        password,
        signUp,
        signIn,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
