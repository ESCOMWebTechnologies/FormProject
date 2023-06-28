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
public class Answer {
    private String _id, _answer;
    private int _value, _userId;
    public Answer(String id, String answer, int value,int userId){
        _id = id;
        _answer = answer;
        _value = value;
        _userId = userId;
    }
    public void GetAnswerData(ResultSet set){
        try{
            _id = set.getString(1);
            _answer = set.getString(2);
            _value = set.getInt(3);
            _userId = set.getInt(4);
        }catch(Exception ex){}
    }
    public Answer(String id){
        _id = id;
    }
    public String GetId(){
        return _id;
    }
    public int GetUserId(){
        return _userId;
    }
    public String GetAnswer(){
        return _answer;
    }
    public int GetValue(){
        return _value;
    }
    public void SetId(String id){
        _id = id;
    }
    public void SetAnswer(String answer){
        _answer = answer;
    }
    public void SetValue(int value){
        _value = value;
    }
}
