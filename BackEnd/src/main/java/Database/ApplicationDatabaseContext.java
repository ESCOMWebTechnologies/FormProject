/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Database;

import java.sql.*;
import java.util.*;

/**
 *
 * @author miku
 */
public class ApplicationDatabaseContext {
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
        _database = "usuario";
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
            user.SetName(response.getString(4));
            user.SetSurname(response.getString(5));
            user.SetImagePath(response.getString(6));
            return user;
        }catch(Exception ex){
            return new User();
        }
    }
}
