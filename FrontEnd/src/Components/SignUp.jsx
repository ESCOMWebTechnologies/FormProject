//Importacion del componente React, createContext y useState
import React, { useContext, useState } from "react";

//Importacion del componente Outlet
import { Outlet } from "react-router-dom";

//Importacion del contexto de la aplicacion web
import { DataContext } from "../Context/DataContext.jsx";

//Importacion del componente useForm
import { useForm } from "react-hook-form";

//Importacion del componente Swal
import Swal from "sweetalert2";

//Se crea la funcion signUp
function SignUp() {
  //Se importan los parametros y funciones necesarias para el signUp del contexto
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { signUp } = useContext(DataContext);
  const { state } = useContext(DataContext);

  //Se crea un objeto del tipo useForm y se importan las funciones a utilizar
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Se crea una funcion para manejar el comportamiento del formuario
  const onSubmit = () => {
    //Se verifica que la contraseña y la contraseña de confirmacion sean iguales
    if (password === password2) {
      //Se almacenan los datos del usuario, se limpia el formulario y se lanza un mensaje de alerta
      signUp(name, surname, username, password);
      console.log(state);
      if (state === "1") {
        Swal.fire({
          title: "<strong>Account registered</strong>",
          icon: "success",
          html: "The current account <b>registered</b> succesfully.",
        });
        setName("");
        setSurname("");
        setUsername("");
        setPassword("");
        setPassword2("");
      } else if (state === "2") {
        Swal.fire({
          title: "<strong>Oops!</strong>",
          icon: "warning",
          html: "The current account <b>Already exist.</b>",
        });
        setName("");
        setSurname("");
        setUsername("");
        setPassword("");
        setPassword2("");
      } else if (state === "3") {
        Swal.fire({
          title: "<strong>Oops!</strong>",
          icon: "warning",
          html: "An <b>internal error</b> occurred please try again.",
        });
      }
    } else {
      //En caso de no ser iguales se resetean las contraseñas y se despliega una alerta
      setPassword("");
      setPassword2("");
      Swal.fire({
        title: "<strong>Oops!</strong>",
        icon: "warning",
        html: "The passwords <b>do not</b> match.",
      });
    }
  };

  //cuando se manda a llaamar al componente signUp se retorna la pagina web
  return (
    <div className="modal modal-sheet position-static d-block">
      <Outlet />
      <div className="modal-dialog">
        <div className="modal-content rounded-4 shadow">
          <div className="p-5 pb-4 border-bottom-0">
            <h1 className="fw-bold mb-0 fs-2">Sign up for free</h1>
          </div>
          <div className="p-5 pt-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex align-items-center justify-content-start mb-3">
                <div className="me-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      {...register("name", {
                        required: true,
                        maxLength: 20
                      })}
                      id="name"
                      autoComplete="off"
                      className="form-control rounded-3"
                      placeholder="Name"
                      value={name}
                      autoFocus
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <label htmlFor="name">Name</label>
                    {errors.name?.type === "required" && (
                      <small> The Name is required</small>
                    )}
                    {errors.name?.type === "maxLength" && (
                      <small> The max leght is 20</small>
                    )}
                    {errors.name?.type === "pattern" && (
                      <small>
                        The name only allows letters in upper and lower case,
                        with tilde and apostrophes.
                      </small>
                    )}
                  </div>
                </div>
                <div className="ms-3">
                  <div className="form-floating">
                    <input
                      type="text"
                      {...register("surname", {
                        required: true,
                        maxLength: 20,
                      })}
                      id="surname"
                      className="form-control rounded-3"
                      placeholder="Surname"
                      value={surname}
                      onChange={(e) => {
                        setSurname(e.target.value);
                      }}
                    />
                    <label htmlFor="surname">Surname</label>
                    {errors.surname?.type === "required" && (
                      <small> The Surname is required</small>
                    )}
                    {errors.surname?.type === "maxLength" && (
                      <small> The max leght is 20</small>
                    )}
                    {errors.surname?.type === "pattern" && (
                      <small>
                        The name only allows letters in upper and lower case,
                        with tilde and apostrophes.
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="align-items-center justify-content-start mb-3">
                <div className="form-floating">
                  <input
                    type="text"
                    {...register("username", {
                      required: true,
                      maxLength: 16,
                      minLength: 3,
                    })}
                    id="username"
                    autoComplete="off"
                    className="form-control rounded-3"
                    placeholder="User name"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <label htmlFor="username">User Name</label>
                  {errors.username?.type === "required" && (
                    <small> The User Name is required</small>
                  )}
                  {errors.username?.type === "minLength" && (
                    <small> The min leght is 3</small>
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
              </div>
              <div className="d-flex align-items-center justify-content-start mb-3">
                <div className="me-3">
                  <div className="form-floating">
                    <input
                      type="password"
                      {...register("password", {
                        required: true,
                        minLength: 8,
                        maxLength: 20,
                      })}
                      id="password"
                      className="form-control rounded-3"
                      placeholder="password"
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
                </div>
                <div className="ms-3">
                  <div className="form-floating">
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: true,
                        minLength: 8,
                        maxLength: 20,
                      })}
                      id="confirmPassword"
                      className="form-control rounded-3"
                      placeholder="Confirm Password"
                      value={password2}
                      onChange={(e) => {
                        setPassword2(e.target.value);
                      }}
                    />
                    <label htmlFor="confirmPassword">Confirm password</label>
                    {errors.confirmPassword?.type === "required" && (
                      <small> The Confirm Password is required</small>
                    )}
                    {errors.confirmPassword?.type === "maxLength" && (
                      <small> The max leght is 20</small>
                    )}
                    {errors.confirmPassword?.type === "minLength" && (
                      <small> The min leght is 8</small>
                    )}
                    {errors.confirmPassword?.type === "pattern" && (
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
                </div>
              </div>
              <button
                className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                type="submit"
              >
                Sign up
              </button>
              <small className="text-body-secondary">
                By clicking Sign up, you agree to the terms of use.
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

//Se exporta el componente SignUp
export default SignUp;
