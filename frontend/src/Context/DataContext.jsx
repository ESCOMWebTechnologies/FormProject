//Importacion del componente React, createContext y useState
import React, { createContext, useState } from "react";

//Se crea un contexto para la aplicacion web
export const DataContext = createContext();

//Se crea la funcion ContextProvider
export function DataContextProvider(props) {
  //Se crean los parametros necesarios paqra crear una cuenta
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [imagePath, setImagePath] = useState(
    "https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
  );

  //Se crea la funcion signUp la cual sera la encargada de almacenar los valores ingresador por el usuario
  async function signUp(name, surname, username, password) {
    setName(name);
    setSurname(surname);
    setUsername(username);
    setPassword(password);
    const response = await fetch(
      "/FormProject/Register?name=" +
        name +
        "&surname=" +
        surname +
        "&username=" +
        username +
        "&password=" +
        password
    );
    const data = await response.json();
    console.log(data);
    console.log(data.response);
    console.log(data.statusCode);
    console.lpg(data.message);
    if (data.response === "ok") {
      if (data.statusCode === "1") {
        return data.statusCode;
      } else {
        setName("");
        setSurname("");
        setUsername("");
        setPassword("");
        return data.statusCode;
      }
    } else {
      setName("");
      setSurname("");
      setUsername("");
      setPassword("");
      return data.statusCode;
    }
  }

  //Se crea la funcion signIn la cual sera la encargada de almacenar los datos ingresador por el usuario
  async function logIn(username, password) {
    setUsername(username);
    setPassword(password);
    const response = await fetch(
      "/FormProject/LoginForm?username=" + username + "&password=" + password
    );
    const data = await response.json();
    console.log(data);
    console.log(data.response);
    console.log(data.statusCode);
    console.lpg(data.message);
    if (data.response === "ok") {
      if (data.statusCode === "1") {
        return data.statusCode;
      } else {
        setUsername("");
        setPassword("");
        return data.statusCode;
      }
    } else {
      setUsername("");
      setPassword("");
      return data.statusCode;
    }
  }

  //Se retorna el componente ContextProvider con las funciones y parametros antes indicados
  return (
    <DataContext.Provider
      value={{
        name,
        surname,
        username,
        password,
        id,
        imagePath,
        signUp,
        logIn,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
