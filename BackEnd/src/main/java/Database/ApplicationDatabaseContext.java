/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Database;

import java.io.Serializable;
import java.sql.*;
import java.util.*;
import Utilities.*;
import Database.*;

/**
 *
 * @author miku
 */
public class ApplicationDatabaseContext implements Serializable {
    //Private attributes
    private transient Connection _connection;
    private static Statement _statementQuery;
    private static ResultSet _resultSet;
    private static String _lastError;
    private String _server;
    private String _database;
    private String _user;
    private String _password;
    private String _idGenerated;
    private Boolean _connected;
    //Public attributes
    public static Vector<User> users;
    //Private Methods
    private void _GetAllUsers(String table, String... condition){
        try{
            if(condition[0] == "" || condition[0] == null){
                condition[0] = "TRUE";
            }
            _resultSet = _statementQuery.executeQuery(String.format("select * from %s where %s",table,condition[0]));
            if(_resultSet.next()){
                do{
                    
                }while(_resultSet.next());
            }else{
                _lastError = "No data to get";
            }
        }catch(Exception ex){
            _lastError = ex.getMessage();
        }
    }
    //Public Methods
    public ApplicationDatabaseContext(){
        users = new Vector<User>();
        _connected = false;
        _server = "jdbc:mysql://localhost:3306/";
        _database = "formProject";
        _user = "root";
        _password = "1234";
    }
    public ApplicationDatabaseContext(String server, String database){
        users = new Vector<User>();
        _connected = false;
        _server = server;
        _database = database;
        _user = "root";
        _password = "1234";
    }
    public ApplicationDatabaseContext(String server, String database, String user, String password){
        users = new Vector<User>();
        _connected = false;
        _server = server;
        _database = database;
        _user = user;
        _password = password;
    }
    public boolean CreateConnection(){
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            _connection = DriverManager.getConnection(_server + _database, _user, _password);
            _statementQuery = _connection.createStatement();
            _connected = true;
            _GetAllUsers("users","TRUE");
        }catch(Exception ex){
            _lastError = "Error creating database connetion: "+ex.getMessage();
        }
        return _connected;
    }
    public boolean IsConnected(){
        return _connected;
    }
    public String GetLastError(){
        return _lastError;
    }
    //Return the first element found with the condition, the condition must have only the terms
    //Like id = {0}; where {0} is the value to search, and id is the parameter
    public ResultSet FirstOrDefault(String parameters, String table, String condition){
        try{
            String query = "";
            if(parameters == "" || parameters == null) query = String.format("select * from %s where %s",table,condition);
            else query = String.format("select % from %s where %s",parameters,table,condition);
            _resultSet = _statementQuery.executeQuery(query);
            if(_resultSet.next()){
                ResultSet temp = _resultSet;
                _resultSet = null;
                return temp;
            }else{
                _lastError = "There's no user found";
                return null;
            }
        }catch(Exception ex){
            _lastError = ex.getMessage();
        }
        return null;
    }
    public User GetUser(ResultSet response){
        try{
            User user = new User(response.getInt(1));
            user.SetUsername(response.getString(2));
            user.SetPassword(response.getString(3));
            String imPath = response.getString(6);
            user.SetName(response.getString(4));
            user.SetSurname(response.getString(5));
            if(imPath == null) user.SetImage("");
            else user.SetImage(imPath);
            return user;
        }catch(Exception ex){
            _lastError = ex.getMessage();
            return null;
        }
    }
    public Boolean RegisterUser(String name, String surname, String username, String password){
        try{
            if(username != null && password != null){
                ResultSet set = FirstOrDefault("", "users", String.format("username='%s' and password='%s';",username,password));
                if(set == null){
                    String query = "insert into users (username,password,name,surname) values (?,?,?,?)";
                    PreparedStatement statement = _connection.prepareStatement(query);
                    statement.setString(1, username);
                    statement.setString(2, password);
                    statement.setString(3, name);
                    statement.setString(4, surname);
                    int rowsAffected = statement.executeUpdate();
                    if(rowsAffected > 0){
                        return true;
                    } else {
                        _lastError = "No user registered";
                        return false;
                    }
                }else{
                    _lastError = "User registered";
                    return false;
                }
            }else{
                _lastError = "No user and no password registered";
                return false;
            }
        }catch(Exception ex){
            _lastError = ex.getMessage();
            return true;   
        }
    }
    private Boolean ExistId(String table,String id){
        try{
            String query = String.format("select * from %s where id='%s'",table,id);
            _resultSet = _statementQuery.executeQuery(query);
            if(_resultSet.next()){
                _lastError = "The id selected exists in the table";
                return true;
            }else{
                return false;
            }
        }catch(Exception ex){
            _lastError = ex.getMessage();
        }
        return true;
    }
    public String GetId(){
        _idGenerated = "";
        _GenerateId();
        return _idGenerated;
    }
    private void _GenerateId(){
        try{
            for(int i = 0, max = 0, min = 0, num = (int)Math.floor(Math.random() * 4); i < 16 ; i++, num = (int)Math.floor(Math.random() * 4)){
                int t = 0;
                switch(num){
                    case 0:{
                        max = 90;
                        min = 65;
                        t = (int)Math.floor(Math.random() * (max - min) + min);
                    }
                    break;
                    case 1:{
                        max = 122;
                        min = 97;
                        t = (int)Math.floor(Math.random() * (max - min) + min);
                    }
                    break;
                    default:{
                        max = 57;
                        min = 48;
                        t = (int)Math.floor(Math.random() * (max - min) + min);
                    }
                    break;
                }
                _idGenerated += (char)t;
            }
        }catch(Exception ex){
            _lastError = ex.getMessage();
        }
    }
    public Question GetQuestion(String questionId){
        try{
            String query = String.format("select id, question, sourcePath from question where id='%s'",questionId);
            _resultSet = _statementQuery.executeQuery(query);
            if(_resultSet.next()){
                Question question = new Question(_resultSet.getString(1),_resultSet.getString(2),_resultSet.getString(3));
                if(question.GetId() == ""){
                    _lastError = "Error gettin the question";
                }else{
                    return question;
                }
            }else{
                _lastError = "No question found";
            }
        }catch(Exception ex){
            _lastError = ex.getMessage();
        }
        return new Question();
    }
    public String RegisterForm(String username, String password, String formName, int questionNumber){
        try{
            if(username != null && password != null){
                ResultSet set = FirstOrDefault("", "users", String.format("username='%s' and password='%s';",username,password));
                if(set == null){
                    _lastError = "Not user found";
                    return "";
                }else{
                    User user = GetUser(set);
                    String query = "insert into forms(id,formName,questionNumber,userId) values (?,?,?,?)";
                    PreparedStatement statement = _connection.prepareStatement(query);
                    String id = "";
                    do id = GetId(); while(ExistId("forms",id));
                    statement.setString(1, id);
                    statement.setString(2, formName);
                    statement.setInt(3, questionNumber);
                    statement.setInt(4, user.GetId());
                    int rowsAffected = statement.executeUpdate();
                    if(rowsAffected > 0){
                        return id;
                    }else{
                        _lastError = "No form registered";
                        return "";
                    }
                }
            }else{
                _lastError = "No user and no password registered";
                return "";
            }
        }catch(Exception ex){
            _lastError = ex.getMessage();
            return "";   
        }
    }
    public Vector<Pair<String,String>> GetForm(String username, String password, String idForm){
        Vector<Pair<String,String>> data = new Vector<Pair<String,String>>();
        if(idForm == null || idForm == ""){
            _lastError = "No form id provided";
            return data;
        }
        try{
            String query = String.format("select f.id, f.formName, f.questionNumber, f.creationDate, f.answerNumber from forms f INNER JOIN users u on f.userId = u.id WHERE u.username='%s' and u.password='%s' and f.id='%s'",username,password,idForm);
            _resultSet = null;
            _resultSet = _statementQuery.executeQuery(query);
            if(_resultSet.next()){
                Pair<String,String> info = new Pair<String,String>("id",_resultSet.getString(1));
                data.add(info);
                info = new Pair<String,String>("formName",_resultSet.getString(2));
                data.add(info);
                info = new Pair<String,String>("question",String.format("%d",_resultSet.getInt(3)));
                data.add(info);
                info = new Pair<String,String>("creationDate",_resultSet.getString(4));
                data.add(info);
                info = new Pair<String,String>("answerNumber",String.format("%d",_resultSet.getInt(5)));
                data.add(info);   
            }else{
                _lastError = "Error getting the info from the database";
            }
            return data;
        }catch(Exception ex){
            _lastError = ex.getMessage();
        }
        return data;
    }
    public Vector<Vector<Pair<String,String>>> GetForms(String username, String password){
        Vector<Vector<Pair<String,String>>> forms = new Vector<Vector<Pair<String,String>>>();
        try{
            if(username == null && password == null){
                _lastError = "Username or password can not be null";
            }else{
                String query = String.format("select f.id, f.formName, f.questionNumber, f.creationDate, f.answerNumber from forms f INNER JOIN users u on f.userId = u.id WHERE u.username='%s' and u.password='%s'",username,password);
                _resultSet = null;
                _resultSet = _statementQuery.executeQuery(query);
                while(_resultSet.next()){
                    Vector<Pair<String,String>> data = new Vector<Pair<String,String>>();
                    Pair<String,String> info = new Pair<String,String>("id",_resultSet.getString(1));
                    data.add(info);
                    info = new Pair<String,String>("formName",_resultSet.getString(2));
                    data.add(info);
                    info = new Pair<String,String>("question",String.format("%d",_resultSet.getInt(3)));
                    data.add(info);
                    info = new Pair<String,String>("creationDate",_resultSet.getString(4));
                    data.add(info);
                    info = new Pair<String,String>("answerNumber",String.format("%d",_resultSet.getInt(5)));
                    data.add(info);
                    forms.add(data);
                }   
            }
        }catch(Exception ex){
            _lastError = ex.getMessage();
        }
        return forms;
    }
    public Boolean EditForm(String username, String password, String formName, int questionNumber, String formId){
        if(username == null || password == null){
            _lastError = "No username or password provided";
            return false;
        }else{
            try{
                String query = String.format("select f.id, f.formName, f.questionNumber, f.creationDate, f.answerNumber from forms f INNER JOIN users u on f.userId = u.id WHERE u.username='%s' and u.password='%s' and f.id='%s'",username,password,formId);
                _resultSet = null;
                _resultSet = _statementQuery.executeQuery(query);
                Form f = new Form();
                f.GetForm(_resultSet);
                query = "update forms set formName=?, questionNumber=?, creationDate=CURRENT_TIMESTAMP where id=? and EXISTS(SELECT u.id FROM users u inner join forms f on u.id = f.userId where u.username=? and u.password=? and f.id=?)";
                PreparedStatement statement = _connection.prepareStatement(query);
                if(formName == null || formName == "") statement.setString(1, f.GetFormName());
                else statement.setString(1, formName);
                if(questionNumber == 0) statement.setInt(2, f.GetQuestionNumber());
                else statement.setInt(2, questionNumber);
                statement.setString(3, formId);
                statement.setString(4, username);
                statement.setString(5, password);
                statement.setString(6, formId);
                int rowsAffected = statement.executeUpdate();
                if(rowsAffected > 0){
                    return true;
                }else{
                    _lastError = "Form not updated";
                    return false;
                }
            }catch(Exception ex){
                _lastError = ex.getMessage();
                return false;
            }
        }
    }
    public Boolean RemoveForm(String id, String username, String password){
        if(username == null || password == null){
            _lastError = "No username or password provided";
        }else{
            try{
                String query = "DELETE FROM forms WHERE id=? and EXISTS(SELECT * FROM users WHERE username=? AND password=?)";
                PreparedStatement statement = _connection.prepareStatement(query);
                statement.setString(1, id);
                statement.setString(2, username);
                statement.setString(3, password);
                int rowsAffected = statement.executeUpdate();
                if(rowsAffected > 0){
                    return true;
                }else{
                    _lastError = "Form not removed";
                }
            }catch(Exception ex){
                _lastError = ex.getMessage();
            }
        }
        return false;
    }
    public String CreateQuestion(String formId, String question, int value){
        if(formId != null && formId != ""){
            try{
                String id = "";
                do id = GetId(); while(ExistId("question",id));
                String query = "INSERT INTO question VALUES(?,?,?,?,?)";
                PreparedStatement statement = _connection.prepareStatement(query);
                statement.setString(1, id);
                statement.setString(2, formId);
                statement.setInt(3, value);
                statement.setString(4, "");
                statement.setString(5, question);
                int rowsAffected = statement.executeUpdate();
                if(rowsAffected > 0){
                    return id;
                }else{
                    _lastError = "No rows affected";
                }
            }catch(Exception ex){
                _lastError = ex.getMessage();
            }
        }else{
            _lastError = "Information not provided";
        }
        return "";
    }
    public String CreateAnswer(int userId, String questionId, String answer){
        if(userId != -1 && questionId != null){
            try{
                String id = "";
                do id = GetId(); while(ExistId("answer",id));
                String query = "INSERT INTO answer VALUES(?,?,?,?,CURRENT_TIMESTAMP,?)";
                PreparedStatement statement = _connection.prepareStatement(query);
                statement.setString(1, id);
                statement.setInt(2, userId);
                statement.setString(3, questionId);
                statement.setString(4, answer);
                statement.setInt(5, 100);
                int rowsAffected = statement.executeUpdate();
                if(rowsAffected > 0){
                    return id;
                }else{
                    _lastError = "No rows affected";
                }
            }catch(Exception ex){
                _lastError = ex.getMessage();
            }
        }else{
            _lastError = "Information not provided";
        }
        return "";
    }
    public String CreateAnswer(int userId, String questionId, String answer,int value){
        if(userId != -1 && questionId != null){
            try{
                String id = "";
                do id = GetId(); while(ExistId("answer",id));
                String query = "INSERT INTO answer VALUES(?,?,?,?,CURRENT_TIMESTAMP,?)";
                PreparedStatement statement = _connection.prepareStatement(query);
                statement.setString(1, id);
                statement.setInt(2, userId);
                statement.setString(3, questionId);
                statement.setString(4, answer);
                statement.setInt(5, value);
                int rowsAffected = statement.executeUpdate();
                if(rowsAffected > 0){
                    return id;
                }else{
                    _lastError = "No rows affected";
                }
            }catch(Exception ex){
                _lastError = ex.getMessage();
            }
        }else{
            _lastError = "Information not provided";
        }
        return "";
    }
    public Pair<Question,Vector<Answer>> GetQuestionR(int userId, String questionId){
        try{
            String query = String.format("select id, question, sourcePath from question WHERE id='%s'",questionId);
            _resultSet = null;
            _resultSet = _statementQuery.executeQuery(query);
            _resultSet.next();
            Question question = new Question(_resultSet.getString(1),_resultSet.getString(2),"");
            Vector<Answer> answers = new Vector<Answer>();
            _resultSet = null;
            query = String.format("select a.id, a.answer, a.value from answer a inner join question q on a.questionId = q.id where a.questionId='%s'",questionId);
            _resultSet = _statementQuery.executeQuery(query);
            while(_resultSet.next()) answers.add(new Answer(_resultSet.getString(1),_resultSet.getString(2),_resultSet.getInt(3),userId));
            return new Pair<Question,Vector<Answer>>(question,answers);
        }catch(Exception ex){
            _lastError = ex.getMessage();
        }
        return new Pair<Question,Vector<Answer>>();
    }
    public Pair<Form,Vector<Pair<Question,Vector<Answer>>>> GetAllForm(int userId, String formId){
        try{
            if(formId != null){
                try{
                    String query = String.format("select id, formName, questionNumber, creationDate, answerNumber from forms WHERE id='%s'",formId);
                    _resultSet = null;
                    _resultSet = _statementQuery.executeQuery(query);
                    Form form = new Form();
                    _resultSet.next();
                    form.GetForm(_resultSet);
                    Vector<Question> questions = new Vector<Question>();
                    _resultSet = null;
                    query = String.format("select q.id, q.question, q.sourcePath from question q inner join forms f on q.formId = f.id where f.id='%s'",formId);
                    _resultSet = _statementQuery.executeQuery(query);
                    while(_resultSet.next()) questions.add(new Question(_resultSet.getString(1),_resultSet.getString(2),_resultSet.getString(3)));
                    Vector<Pair<Question,Vector<Answer>>> data = new Vector<Pair<Question,Vector<Answer>>>();
                    for(Question question : questions) data.add(GetQuestionR(userId, question.GetId()));
                    return new Pair<Form,Vector<Pair<Question,Vector<Answer>>>>(form, data);
                }catch(Exception ex){
                    _lastError = ex.getMessage();
                }
            }else{
                _lastError = "No information povided";
            }
        }catch(Exception ex){
            _lastError = ex.getMessage();
        }
        return new Pair<Form,Vector<Pair<Question,Vector<Answer>>>>();
    }
    public Boolean RemoveQuestion(String questionId, int userId){
        if(questionId == null){
            _lastError = "No username or password provided";
        }else{
            try{
                String query = "DELETE FROM question WHERE id=? and EXISTS(SELECT * FROM users WHERE id=?)";
                PreparedStatement statement = _connection.prepareStatement(query);
                statement.setString(1,questionId);
                statement.setInt(2, userId);
                int rowsAffected = statement.executeUpdate();
                if(rowsAffected > 0){
                    return true;
                }else{
                    _lastError = "Form not removed";
                }
            }catch(Exception ex){
                _lastError = ex.getMessage();
            }
        }
        return false;
    }
    public Pair<Form,Vector<Question>> GetFormQuestions(String formId){
        if(formId != null){
            try{
                String query = String.format("select id, formName, questionNumber, creationDate, answerNumber from forms WHERE id='%s'",formId);
                _resultSet = null;
                _resultSet = _statementQuery.executeQuery(query);
                Form form = new Form();
                _resultSet.next();
                form.GetForm(_resultSet);
                Vector<Question> questions = new Vector<Question>();
                _resultSet = null;
                query = String.format("select q.id, q.question, q.sourcePath from question q inner join forms f on q.formId = f.id where f.id='%s'",formId);
                _resultSet = _statementQuery.executeQuery(query);
                while(_resultSet.next()) questions.add(new Question(_resultSet.getString(1),_resultSet.getString(2),_resultSet.getString(3)));
                return new Pair<Form,Vector<Question>>(form,questions);
            }catch(Exception ex){
                _lastError = ex.getMessage();
            }
        }else{
            _lastError = "No information povided";
        }
        return null;
    }
}
