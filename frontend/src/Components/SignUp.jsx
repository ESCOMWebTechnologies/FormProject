//Importacion del componente React, createContext y useState
import React, { useContext, useState } from "react";

//Importacion del componente Outlet
import { Outlet } from "react-router-dom";

//Importacion del contexto de la aplicacion web
import { DataContext } from "../Context/DataContext.jsx";

//Importacion del componente useForm
import { useForm } from "react-hook-form";

//Se crea la funcion signUp
function SignUp() {
  //Se importan los parametros y funciones necesarias para el signUp del contexto
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { signUp } = useContext(DataContext);

  //Se crea un objeto del tipo useForm y se importan las funciones a utilizar
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Se crea una funcion para manejar el comportamiento del formuario
  const onSubmit = (data) => {
    //Se verifica que la contraseña y la contraseña de confirmacion sean iguales
    if (password === password2) {
        //Se almacenan los datos del usuario, se limpia el formulario y se lanza un mensaje de alerta
        signUp(name, lastName, user, password);
        setName("");
        setLastName("");
        setUser("");
        setPassword("");
        setPassword2("");
        alert("Succes create account...");
    } else {
      //En caso de no ser iguales se resetean las contraseñas y se despliega una alerta
      alert("The passwords didn't match...");
      setPassword("");
      setPassword2("");
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
            <h1 className="fw-bold mb-0 fs-2">Sign up for free</h1>
          </div>
          <div className="modal-body p-5 pt-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  {...register("name", {
                    required: true,
                    maxLength: 20,
                    pattern: /^([A-ZÑa-zñáéíóúÁÉÍÓÚ']|[^ ])+$/,
                  })}
                  id="name"
                  className="form-control rounded-3"
                  placeholder="Name"
                  value={name}
                  autoFocus
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label>Name</label>
                {errors.name?.type === "required" && (
                  <small> The Name is required</small>
                )}
                {errors.name?.type === "maxLength" && (
                  <small> The max leght is 20</small>
                )}
                {errors.name?.type === "pattern" && (
                  <small>
                    The name only allows letters in upper and lower case, with
                    tilde and apostrophes.
                  </small>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  {...register("lastName", {
                    required: true,
                    maxLength: 20,
                    pattern: /^([A-ZÑa-zñáéíóúÁÉÍÓÚ']|[^ ])+$/,
                  })}
                  id="lastName"
                  className="form-control rounded-3"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <label>Last Name</label>
                {errors.lastName?.type === "required" && (
                  <small> The Last Name is required</small>
                )}
                {errors.lastName?.type === "maxLength" && (
                  <small> The max leght is 20</small>
                )}
                {errors.lastName?.type === "pattern" && (
                  <small>
                    The name only allows letters in upper and lower case, with
                    tilde and apostrophes.
                  </small>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  {...register("userName", {
                    required: true,
                    maxLength: 16,
                    pattern: /^([A-Za-z0-9_-]|[^ ]){3,16}$/,
                  })}
                  id="userName"
                  className="form-control rounded-3"
                  placeholder="User name"
                  value={user}
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}
                />
                <label>User Name</label>
                {errors.userName?.type === "required" && (
                  <small> The User Name is required</small>
                )}
                {errors.userName?.type === "maxLength" && (
                  <small> The max leght is 16</small>
                )}
                {errors.userName?.type === "pattern" && (
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
                    minLength: 8,
                    maxLength: 20,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,20}$/,
                  })}
                  id="password"
                  className="form-control rounded-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label>Password</label>
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
              <div className="form-floating mb-3">
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: true,
                    minLength: 8,
                    maxLength: 20,
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,20}$/,
                  })}
                  id="confirmPassword"
                  className="form-control rounded-3"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                />
                <label>Confirm password</label>
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
