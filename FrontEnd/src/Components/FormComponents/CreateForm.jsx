import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContext.jsx";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {
    const specialSymbols = {' ': '%20','!': '%21','"': '%22','#': '%23','$': '%24','%': '%25','&': '%26','\'': '%27','(': '%28',')': '%29','*': '%2A','+': '%2B',',': '%2C','-': '%2D','.': '%2E','/': '%2F',':': '%3A',';': '%3B','=': '%3D','?': '%3F','@': '%40','[': '%5B','\\': '%5C',']': '%5D','^': '%5E','_': '%5F','`': '%60','{': '%7B','|': '%7C','}': '%7D','~': '%7E','á': '%C3%A1','é': '%C3%A9','í': '%C3%AD','ó': '%C3%B3','ú': '%C3%BA','ñ': '%C3%B1','Á': '%C3%81','É': '%C3%89','Í': '%C3%8D','Ó': '%C3%93','Ú': '%C3%9A','Ñ': '%C3%91'};
    const navigate = useNavigate();
    const { username, password} = useContext(DataContext);
    const [formData, setFormData] = useState({
        formName:'',
        questionNumber:'',
    });
    const [questionData, setQuestionData] = useState([]);
    const [answerData, setAnswerData] = useState({});
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
        ...prevState,
        [name]: value
        }));
    };
    const handleQuestionChange = (questionId, event) => {
        const { name, value } = event.target;
        setQuestionData((prevState) => ({
          ...prevState,
          [questionId]: {
            question: name.startsWith('question') ? value : prevState[questionId]?.question,
            value: name.startsWith('value') ? value : prevState[questionId]?.value,
            answers: []
          }
        }));
    };
    const handleAnswerChange = (questionId, event) => {
        const { name, value } = event.target;
        const answers = value.split(",");
        setAnswerData((prevState) => ({
            ...prevState,
            [questionId]: {
                ...prevState[questionId],
                answers: answers
            }
        }));
    };
    const CodificateText = (text) => {
        let newString = "";
        if(text === "" || text === undefined) {
            return text;
        }
        const arr = Array.from(text);
        arr.forEach((char)=>{
            if(char in specialSymbols){
                newString += specialSymbols[char];
            }else{
                newString += char;
            }
        });
        if(newString === "") return text;
        return newString;
    };
    // Manejador de eventos para enviar el formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        let formId = "";
        let formNameT = CodificateText(formData.formName);
        let correctQuestion = 0;
        fetch(`/FormProject/Forms/api/CreateForm?username=${username}&password=${password}&formName=${formNameT}&questionNumber=${formData.questionNumber}`)
        .then(response => response.json())
        .then(response =>{
            if(response.statusCode === "1"){
                formId = response.message;
                let questionId = "";
                let correct = 0;
                let counter = 1;
                if(formId != ""){
                    Object.entries(questionData).map(([questionKey, { question, value }]) => {
                        let questionCoded = CodificateText(question);
                        if(questionCoded != "")
                            fetch(`/FormProject/Forms/api/CreateQuestion?username=${username}&password=${password}&formId=${formId}&value=${value}&question=${questionCoded}`)
                            .then(responseQuestion => responseQuestion.json())
                            .then(responseQuestion => {
                                if(responseQuestion.statusCode === "1"){
                                    questionId = responseQuestion.message;
                                    console.log(answerData);
                                    if(questionId != null || questionId != ""){
                                        let answers = answerData[`question${counter}`];
                                        console.log(answers);
                                        for(let answer of answers.answers){
                                            let newAnswer = CodificateText(answer);
                                            if(newAnswer != "")
                                                fetch(`/FormProject/Forms/api/CreateAnswer?username=${username}&password=${password}&questionId=${questionId}&answer=${newAnswer}&param=ok`)
                                                .then(responseAnswer => responseAnswer.json())
                                                .then(responseAnswer => {
                                                    correct += 1;
                                                }).catch(responseAnswer => Swal.fire({
                                                    title: "<strong>Error creating the form</strong> "+responseAnswer,
                                                    icon: "warning",
                                                }));
                                        }
                                        counter += 1;
                                        if(correct === answers.length) {
                                            correctQuestion += 1;
                                        }
                                    }else{
                                        Swal.fire({
                                            title: "<strong>Error creating the form</strong> "+ responseAnswer.message,
                                            icon: "warning",
                                        });
                                    }
                                }else{
                                    Swal.fire({
                                        title: "<strong>Error creating the form</strong> "+ responseQuestion.message,
                                        icon: "warning",
                                    });
                                }
                            }).catch(responseQuestion => Swal.fire({
                                title: "<strong>Error creating the form</strong> "+responseQuestion,
                                icon: "warning",
                            }));
                        return null;
                    });
                }else{
                    Swal.fire({
                        title: "<strong>Error creating the form </strong>"+ response.message,
                        icon: "warning",
                    });
                }
            }else{
                Swal.fire({
                    title: "<strong>Error creating the form</strong> "+ response.message,
                    icon: "warning",
                });
            }
        }).catch(response => Swal.fire({
            title: "<strong>Error creating the form</strong> "+response,
            icon: "warning",
        }));
        if(correctQuestion === formData.questionNumber){
            Swal.fire({
                title: "<strong>Form created</strong>",
                icon: "success",
            });
        }
        navigate("/FormProject/Forms");
    };
    const generateQuestionSection = () => {
        const questionSection = [];
        for (let i = 1; i <= formData.questionNumber; i++) {
          const questionId = `question${i}`; // Obtener el identificador de la pregunta
          questionSection.push(
            <div key={i} className="col-md-6 col-sm-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Question {i}</h5>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Question {i}</label>
                      <input
                        type="text"
                        name={`question${i}`}
                        required
                        className="form-control"
                        placeholder="Set the question here"
                        onChange={(event) => handleQuestionChange(questionId, event)}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Question {i} value</label>
                      <input
                        type="number"
                        name={`value${i}`}
                        required
                        max="100"
                        min="0"
                        className="form-control"
                        placeholder="Set the value of the question"
                        onChange={(event) => handleQuestionChange(questionId, event)}
                      />
                    </div>
                    <div className="col-12 row">
                      <div className="col">
                        <label className="form-label">Answers</label>
                        <textarea
                          className="form-control"
                          name={`answers${i}`}
                          required
                          placeholder="Set your answers here, separated with a comma"
                          onChange={(event) => handleAnswerChange(questionId, event)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return questionSection;
      };
      
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label className="form-label">Form Name</label>
                <input name="formName" onChange={handleChange} type="text" placeholder="Form name" className="form-control" required/>
                <label className="form-label">Question number</label>
                <input name="questionNumber" onChange={handleChange} type="number" placeholder="Number of questions" className="form-control" required/>
                <div className="row">
                    {generateQuestionSection()}
                </div>
                <button type="submit" className="btn btn-outline-success">Submit</button>
            </form>
        </div>
    );
};
export default CreateForm;