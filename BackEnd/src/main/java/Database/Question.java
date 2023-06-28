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
public class Question {
    private String _question, _sourcePath, _id;
    public Question(String id, String question, String sourcePath){
        _id = id;
        _question = question;
        _sourcePath = sourcePath;
    }
    public Question(String id, String question){
        _question = question;
        _id = id;
    }
    public Question(){
        _question = "";
        _sourcePath = "";
    }
    public void SetQuestion(String question){
        _question = question;
    }
    public void SetSourcePath(String sourcePath){
        _sourcePath = sourcePath;
    }
    public String GetQuestion(){
        return _question;
    }
    public String GetSourcePath(){
        return _sourcePath;
    }
    public String GetId(){
        return _id;
    }
}
