import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataContext.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const MainMenu = () => {
  const navigate = useNavigate();
  const { username, password } = useContext(DataContext);
  const [data, setData] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  useEffect(() => {
    fetch(`/FormProject/Forms/api/GetForms?username=${username}&password=${password}`)
      .then(response => response.json())
      .then(response =>{ setData(response.data);})
      .catch(error => console.log(error));
  }, [username, password, reloadData]);
  const handleEditForm=(id)=>{
    navigate(`/FormProject/Forms/EditForm/${id}`);
    //navigate(`/FormProject/temp/`);
  };
  const handleAnswerForm=(id)=>{
    navigate(`/FormProject/Forms/AnswerForm/${id}`);
  };
  const handleCreateForm=()=>{
    navigate("/FormProject/Forms/CreateForm/");
  };
  const handleRemoveForm = (id) => {
    //console.log("HOla");
    fetch(`/FormProject/Forms/api/RemoveForm?username=${username}&password=${password}&formId=${id}`)
      .then(response => response.json())
      .then(response => {
        if(response.statusCode === "1"){
          Swal.fire({
            title: "<strong>Form deleted successfully</strong>",
            icon: "success",
          });
          setReloadData(true);
        }else{
          Swal.fire({
            title: "<strong>An error occurred: </strong> " + response.message,
            icon: "warning",
          });
        }
        navigate("/FormProject/Forms");
      })
      .catch(error => {
        console.log(error);
      });
  };
  if(!data){
    return (
    <div className="container">
      <h1>From creator A</h1>
      <button className="btn btn-outline-info" onClick={handleCreateForm}>Create new form</button>
    </div>
    );
  }
  return (
    <div className="container">
      <h1>From creator</h1>
      <button className="btn btn-outline-info" onClick={handleCreateForm}>Create new form</button>
      <div className="row">
      {data.map(item => (
        <div className="col" key={item.id}>
          <div className="card text-center">
            <div className="card-header">
              {item.formName}
            </div>
            <div className="card-body">
              <h5 className="card-title">Total answers</h5>
              <p className="card-text">{item.answerNumber}</p>
              <div className="btn-group">
                <a onClick={()=>handleAnswerForm(item.id)} className="btn btn-outline-primary">
                  See form
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                  </svg>
                </a>
                <a onClick={()=>handleEditForm(item.id)} className="btn btn-outline-warning">
                  Edit form
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                </a>
                <a className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={"#modal"+item.id}>
                  Remove form
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-diamond" viewBox="0 0 16 16">
                    <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                  </svg>
                </a>
              </div>
              <div className="modal fade" id={"modal"+item.id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-5" id={"modalLabel"+item.id}>Are you sure to remove: {item.formName}</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      You are going to delete the form, be careful, because all the information related to this form will be lost.
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <a onClick={()=>handleRemoveForm(item.id)} className="btn btn-danger" data-bs-dismiss="modal" type="button">Remove</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-body-secondary">
              {item.creationDate}
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};
export default MainMenu;