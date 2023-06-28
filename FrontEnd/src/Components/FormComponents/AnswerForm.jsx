import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContext.jsx";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const AnswerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { username, password} = useContext(DataContext);
  const [answers, setAnswers] = useState({});
  // Manejador de eventos para actualizar el estado cuando los campos del formulario cambian
  function handleInputChange(event, index) {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [fieldName]: fieldValue,
    }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    let counter = 0;
    for (let key in answers) {
      let value = answers[key];
      console.log(id);
      fetch(`/FormProject/Forms/api/CreateAnswer?username=${username}&password=${password}&questionId=${key}&answer=${value}&formId=${id}`)
      .then(response => response.json())
      .then(response =>{
        if(response.statusCode === "1") counter += 1;
      }).catch(error =>{
        Swal.fire({
          title: "<strong>Error:</strong> "+error,
          icon: "warning",
        });
      })
    }
    navigate("/FormProject/Forms/");
  }
  const [ formName, setFormName ] = useState("");
  const [questionNumber, setQuestionNumber ] = useState("");
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    fetch(`/FormProject/Forms/api/GetFormResponse?username=${username}&password=${password}&formId=${id}`)
          .then(response => response.json())
          .then(response => {
            if (response.statusCode === "1" && response.message) {
              setFormName(response.message.formName);
              setQuestionNumber(response.message.questionNumber);
              if(response.message.questions.length > 0){
                const fetchedQuestions = response.message.questions.map(question => question);
                setQuestions(fetchedQuestions);
              }
            }
          })
          .catch(error => console.log(error));
        }, [username, password, id]);
  return (
    <div className="container">
      <h1>{formName}</h1>
      <h2>Total questions: {questionNumber}</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} className="card">
            <div className="card-body">
              <h5 className="card-title">{question.question}</h5>
              <input
                className="form-control"
                type="text"
                required
                name={question.id}
                placeholder="Type your answer here"
                onChange={(event) => handleInputChange(event, index)}
              />
              </div>
          </div>
        ))}
        <button type="submit" className="btn btn-outline-success">Enviar</button>
      </form>
    </div>
  );
};
export default AnswerForm;