/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Database;

import java.io.Serializable;
import java.sql.*;
import java.util.*;
import java.time.LocalDate;

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
            return new User();
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
    public Boolean CreateForm(int userId, String formName, int questionNumber, String formId){
        if(formId != null && formName != null && userId < 0 && questionNumber == 0){
            try{
                String query = "INSERT INTO forms VALUES (?,?,?,?,?,?)";
                LocalDate currentDate = LocalDate.now();
                PreparedStatement statement = _connection.prepareStatement(query);
                statement.setString(1, formId);
                statement.setString(2, formName);
                statement.setInt(3, questionNumber);
                statement.setString(4, currentDate.toString());
                statement.setInt(5, userId);
                statement.setInt(6, 0);
                int rowsAffected = statement.executeUpdate();
                if(rowsAffected > 0){
                    return true;
                } else {
                    _lastError = "Error unknown while creating the form";
                    return false;
                }
            }catch (Exception ex){
                _lastError = ex.getMessage();
            }
        }else{
            _lastError = "Some parameters are empty";
        }
        return false;
    }
    public Boolean RemoveForm(String formId, int userId){
        if(formId != null && userId < 0){
            try{
                String query = "DELETE FROM forms WHERE id=? AND userId=?";
                PreparedStatement statement = _connection.prepareStatement(query);
                statement.setString(1, formId);
                statement.setInt(2, userId);
                int rowsAffected = statement.executeUpdate();
                if(rowsAffected > 0){
                    return true;
                } else {
                    _lastError = "Error unknown while deleting the form";
                    return false;
                }
            }catch (Exception ex){
                _lastError = ex.getMessage();
            }
        }else{
            _lastError = "Some parameters are empty";
        }
        return false;   
    }
    public Boolean ExistId(String id, String table){
        String query = String.format("SELECT * FROM %s WHERE id = '%s';",table,id);
        try{
            _resultSet = _statementQuery.executeQuery(query);
            return (_resultSet.next()) ? true : false;
        }catch(Exception ex){
            _lastError = ex.getMessage();
        }finally{
            return false;
        }
    }
}
