/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Database;
import Utilities.Pair;
import java.util.*;
/**
 *
 * @author miku
 */
public class User {
    //Private attributes
    private static int _id;
    private static String _username;
    private static String _password;
    private static String _surname;
    private static String _name;
    private static String _rolename;
    private static String _imagePath;
    //Public attributes
    
    //Private Methods
    
    //Public Methods
    public User(){
        _id = -1;
        _username = _surname = _name = _rolename = _imagePath = _password = "";
    }
    public User(int id){
        _id = id;
        _username = _surname = _name = _rolename = _imagePath = _password = "";
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
    
    public void SetName(String name){
        _name = name;
    }
    public String GetName(){
        return (_name != null) ? _name : "No name";
    }
    
    public void SetSurname(String surname){
        _surname = surname;
    }
    public String GetSurname(){
        return (_surname != null) ? _surname : "No surname";
    }
    
    public void SetImage(String image){
        _imagePath = image;
    }
    public void SetImagePath(String imagePath){
        _imagePath = imagePath;
    }
    public String GetImagePath(){
        return (_imagePath != null) ? _imagePath : "No image saved";
    }
    
    public int GetId(){
        return (_username != null && _password != null) ? _id : -1 ;
    }
    
    public Vector<Pair<String,String>> GetAllUserInformation(){
        Vector<Pair<String,String>> elements = new Vector<Pair<String,String>>();
        elements.add(new Pair<String,String>("username",_username));
        elements.add(new Pair<String,String>("name",_name));
        elements.add(new Pair<String,String>("surname",_surname));
        elements.add(new Pair<String,String>("id",String.valueOf(_id)));
        elements.add(new Pair<String,String>("imagePath",_imagePath));
        return elements;
    }
}
