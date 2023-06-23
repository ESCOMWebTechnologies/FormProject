//Importacion del componente React, createContext y useState
import React, { useContext, useState } from "react";

//Importacion del componente Outlet
import { Navigate, Outlet } from "react-router-dom";

//Importacion del contexto de la aplicacion web
import { DataContext, DataContextProvider } from "../Context/DataContext.jsx";

//Importacion del componente useForm
import { useForm } from "react-hook-form";

//Importacion del componente Swal
import Swal from "sweetalert2";

import { useNavigate } from 'react-router-dom';
//Se crea la funcion signIn
function LogIn() {
  //Se importan los parametros y funciones necesarias para el signIn del contexto
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useContext(DataContext);
  const { state } = useContext(DataContext);
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const {setUserData} = dataContext;
  //Se crea un objeto del tipo useForm y se importan las funciones a utilizar
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Se crea una funcion para manejar el comportamiento del formuario
  const onSubmit = async () => {
    //Se verifica que el usuario exista
    await logIn(username, password);
    //En caso de existir se limpia el formulario y se manda un mensaje de alerta
    if (state === "1") {
      Swal.fire({
        title: "<strong>Welcome</strong> "+username,
        icon: "success",
      });
      setUsername("");
      setPassword("");
      //Aplicar redirect a la página princial
      navigate("/FormProject/Forms");
    } else if (state === "2") {
      Swal.fire({
        title: "<strong>Oops!</strong>",
        icon: "warning",
        html: "The user/password are <b>incorrect or do not exist</b> please try again. ",
      });
      setUsername("");
      setPassword("");
    } else if (state === "3") {
      Swal.fire({
        title: "<strong>Oops!</strong>",
        icon: "warning",
        html: "An <b>internal error</b> occurred please try again.",
      });
    }
  };

  //cuando se manda a llaamar al componente signUp se retorna la pagina web
  return (
    <div
      className="modal modal-sheet position-static d-block bg-body-secondary p-2 py-md-2"
      tabIndex="-1"
      role="dialog"
    >
      <Outlet />
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-4 shadow">
          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h1 className="fw-bold mb-0 fs-2">Log In</h1>
          </div>
          <div className="modal-body p-5 pt-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  {...register("username", {
                    required: true,
                    maxLength: 16,
                  })}
                  id="username"
                  autoComplete="off"
                  className="form-control rounded-3"
                  placeholder="User Name"
                  value={username}
                  autoFocus
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <label htmlFor="username">User Name</label>
                {errors.username?.type === "required" && (
                  <small> The User Name is required</small>
                )}
                {errors.username?.type === "maxLength" && (
                  <small> The max leght is 16</small>
                )}
                {errors.username?.type === "pattern" && (
                  <small>
                    The User Name only allows uppercase letters, lowercase
                    letters, numbers, underscore, and hyphen
                  </small>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 4,
                    maxLength: 20,
                  })}
                  id="password"
                  className="form-control rounded-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label htmlFor="password">Password</label>
                {errors.password?.type === "required" && (
                  <small> The Password is required</small>
                )}
                {errors.password?.type === "maxLength" && (
                  <small> The max leght is 20</small>
                )}
                {errors.password?.type === "minLength" && (
                  <small> The min leght is 8</small>
                )}
                {errors.password?.type === "pattern" && (
                  <small>
                    The format of the password needs:
                    <ul>
                      <li>At least one capital letter.</li>
                      <li>At least one lower letter.</li>
                      <li>At least one digit.</li>
                      <li>No blank spaces.</li>
                      <li>At least one special character</li>
                    </ul>
                  </small>
                )}
              </div>
              <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

//Se exporta el componente
export default LogIn;
