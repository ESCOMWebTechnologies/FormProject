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
public class Role {
    //Private Attributes
    private static int _id;
    private static String _rolename;
    
    
    //Public Methods
    public Role(){
        _id = -1;
        _rolename = "";
    }
    public Role(int id, String rolename){
        _id = id;
        _rolename = rolename;
    }
    public void SetRoleName(String rolename){
        _rolename = rolename;
    }
    public String GetRoleName(){
        return (_rolename != null) ? _rolename : "No rolename";
    }
    public int GetId(){
        return _id;
    }
}
