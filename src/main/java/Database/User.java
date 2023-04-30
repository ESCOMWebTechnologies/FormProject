/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Database;

/**
 *
 * @author miku
 */
public class User {
    //Private attributes
    private static int _id;
    private static String _username;
    private static String _password;
    //Public attributes
    
    //Private Methods
    
    //Public Methods
    public User(){
        _id = -1;
        _username = "";
        _password = "";
    }
    public User(int id, String username, String password){
        _id = id;
        _username = username;
        _password = password;
    }
    public void SetUsername(String username){
        _username = username;
    }
    public String GetUsername(){
        return (_username != null) ? _username : "No username available";
    }
    //Needs to implement the hash cifrate method
    public void SetPassword(String password){
        _password = password;
    }
    public String GetPassword(){
        return(_password != null) ? _password : "No password";
    }
    public int GetId(){
        return (_username != null && _password != null) ? _id : -1 ;
    }
}
