/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Database;

import java.sql.ResultSet;

/**
 *
 * @author miku
 */
public class Form {
    private static String _id, _formName, _creationDate;
    private static int _userId, _questionNumber, _answerNumber;
    public Form(){
        _formName = _id = _creationDate = "";
        _userId = _questionNumber = _answerNumber = 0;
    }
    public Form(String id){
        _id = id;
        _formName  = _creationDate = "";
        _userId = _questionNumber = _answerNumber = 0;
    }
    public void SetFormName(String formName){
        _formName = formName;
    }
    public void SetQuestionNumber(int questionNumber){
        _questionNumber = questionNumber;
    }
    public void SetAnswerNumber(int answerNumber){
        _answerNumber = answerNumber;
    }
    public void SetUserId(int userId){
        _userId = userId;
    }
    public void SetCreationDate(String creationDate){
        _creationDate = creationDate;
    }
    public String GetFormName(){
        return _formName;
    }
    public int GetQuestionNumber(){
        return _questionNumber;
    }
    public int GetAnswerNumber(){
        return _answerNumber;
    }
    public int GetUserId(){
        return _userId;
    }
    public String GetId(){
        return _id;
    }
    public String GetCreationDate(){
        return _creationDate;
    }
    public void GetForm(ResultSet response){
        try{
            _id = response.getString(1);
            _formName = response.getString(2);
            _questionNumber = response.getInt(3);
            _creationDate = response.getString(4);
            _userId = response.getInt(5);
            _answerNumber = response.getInt(6);
        }catch(Exception ex){ }
    }
}
