/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Utilities;

/**
 *
 * @author miku
 */
public class IdCreator {
    private static String _lastError;
    private String _idGenerated;
    public IdCreator(){
        _lastError = "";
        _idGenerated = "";
    }
    public static String GetLastError(){
        return _lastError;
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
}
