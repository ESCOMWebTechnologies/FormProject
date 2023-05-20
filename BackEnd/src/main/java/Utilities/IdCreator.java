package Utilities;
import java.util.*;
public class IdCreator {
    private static char GetRandomCharacter(){
        Random random = new Random();
        int let = (int)random.nextDouble();
        char characterRet;
        switch(let){
            case 0:{
                int max = 90, min = 65;
                int character = (int)Math.floor(Math.random() * (max - min + 1) + min);
                characterRet = (char)character;
            } break;
            case 1:{
                int max = 122, min = 97;
                int character = (int)Math.floor(Math.random() * (max - min + 1) + min);
                characterRet = (char)character;
            } break;
            default:{
                int max = 57, min = 48;
                int character = (int)Math.floor(Math.random() * (max - min + 1) + min);
                characterRet = (char)character;
            } break;
        }
        return characterRet;
    }
    public static String GenerateId(){
        int length = 16;
        String idGenerated = "";
        for(int i = 0 ; i < length ; i++) idGenerated += GetRandomCharacter();
        return idGenerated;
    }
}
