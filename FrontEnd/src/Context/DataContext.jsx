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
  const [state, setState] = useState("");
  const [imagePath, setImagePath] = useState(
    "https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
  );
  const [idForm, setIdForm] = useState("");
  const [formName, setFormName] = useState("");
  const [questionNumber, setQuestionNumber] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [answerNumber, setAnswerNumber] = useState("");
  function SetIdForm(id){
    setIdForm(id);
  }
  //Se crea la funcion signUp la cual sera la encargada de almacenar los valores ingresador por el usuario
  function signUp(name, surname, username, password) {
    setName(name);
    setSurname(surname);
    setUsername(username);
    setPassword(password);
    fetch("/FormProject/api/Register?name="+name+"&surname="+surname+"&username="+username+"&password="+password)
      .then((response) => response.json())
      .then((data) => {
        if (data.response === "ok") {
          if (data.statusCode === "1") {
            setState(data.statusCode);
          } else {
            setName("");
            setSurname("");
            setUsername("");
            setPassword("");
            setState(data.statusCode);
          }
        } else {
          setName("");
          setSurname("");
          setUsername("");
          setPassword("");
          setState(data.statusCode);
        }
      });
  }
  //Se crea la funcion signIn la cual sera la encargada de almacenar los datos ingresador por el usuario
  function logIn(username, password) {
    setUsername(username);
    setPassword(password);
    fetch("/FormProject/api/LoginForm?username="+username+"&password="+password)
      .then((response) => response.json())
      .then((data) => {
        if (data.response === "ok") {
          if (data.statusCode === "1") {
            setState(data.statusCode);
          } else {
            setUsername("");
            setPassword("");
            setState(data.statusCode);
          }
        } else {
          setUsername("");
          setPassword("");
          setState(data.statusCode);
        }
      });
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
        state,
        imagePath,
        signUp,
        logIn,
        SetIdForm,
        idForm,
        formName,
        questionNumber,
        creationDate,
        answerNumber,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

