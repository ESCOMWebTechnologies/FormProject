import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContext.jsx";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const GetForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { username, password} = useContext(DataContext);
  // Manejador de eventos para actualizar el estado cuando los campos del formulario cambian
  const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevState) => ({
      ...prevState,
      [name]: value
      }));
  };

  // Manejador de eventos para enviar el formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/FormProject/Forms/api/EditForm?username=${username}&password=${password}&formName=${formData.formName}&questionNumber=${formData.questionNumber}&formId=${id}`).then(response => response.json()).then(response => {
      if(response.statusCode === "1"){
        Swal.fire({
            title: "<strong>Form edited</strong>",
            icon: "success",
        });
      }else{
          Swal.fire({
              title: "<strong>Error creating the form</strong> "+response.data,
              icon: "warning",
          });
      }
    }).catch(error => Swal.fire({ title: "<strong>Error creating the form</strong> "+error, icon: "success",}));
    navigate("/FormProject/Forms");
  };
  useEffect(() => {
    fetch(`/FormProject/Forms/api/GetFormResponse?username=${username}&password=${password}&idForm=${id}`)
    .then(response => response.json())
    .then(response => {
      if (response.statusCode === "1" && response.data) {
        console.log()
        console.log(response.message);
        let t = response.message.questions;
        console.log("HOla");
        console.log(t);
      }
    })
    .catch(error => console.log(error));
  }, [username, password, id]);
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
          <label className="form-label">Form Name</label>
          <input name="formName" placeholder={formData.formName} value={formData.formName} onChange={handleChange} type="text" className="form-control"/>
          <label className="form-label">Question number</label>
          <input name="questionNumber" placeholder={formData.questionNumber} value={formData.questionNumber} onChange={handleChange} type="number" className="form-control"/>
          <button type="submit" className="btn btn-outline-warning">Submit</button>
      </form>
    </div>
  );
};
export default GetForm;