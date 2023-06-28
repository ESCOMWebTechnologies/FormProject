/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Utilities;
import java.util.*;

/**
 *
 * @author miku
 */
public class CodificationMap {
    private Map<String,String> specialSymbols;
    public CodificationMap(){
        specialSymbols = new HashMap<String,String>();
        specialSymbols.put("%20", " ");
        specialSymbols.put("%21", "!");
        specialSymbols.put("%22", "\"");
        specialSymbols.put("%23", "#");
        specialSymbols.put("%24", "$");
        specialSymbols.put("%25", "%");
        specialSymbols.put("%26", "&");
        specialSymbols.put("%27", "'");
        specialSymbols.put("%28", "(");
        specialSymbols.put("%29", ")");
        specialSymbols.put("%2A", "*");
        specialSymbols.put("%2B", "+");
        specialSymbols.put("%2C", ",");
        specialSymbols.put("%2D", "-");
        specialSymbols.put("%2E", ".");
        specialSymbols.put("%2F", "/");
        specialSymbols.put("%3A", ":");
        specialSymbols.put("%3B", ";");
        specialSymbols.put("%3D", "=");
        specialSymbols.put("%3F", "?");
        specialSymbols.put("%40", "@");
        specialSymbols.put("%5B", "[");
        specialSymbols.put("%5C", "\\");
        specialSymbols.put("%5D", "]");
        specialSymbols.put("%5E", "^");
        specialSymbols.put("%5F", "_");
        specialSymbols.put("%60", "`");
        specialSymbols.put("%7B", "{");
        specialSymbols.put("%7C", "|");
        specialSymbols.put("%7D", "}");
        specialSymbols.put("%7E", "~");
        specialSymbols.put("%C3%A1", "á");
        specialSymbols.put("%C3%A9", "é");
        specialSymbols.put("%C3%AD", "í");
        specialSymbols.put("%C3%B3", "ó");
        specialSymbols.put("%C3%BA", "ú");
        specialSymbols.put("%C3%B1", "ñ");
        specialSymbols.put("%C3%81", "Á");
        specialSymbols.put("%C3%89", "É");
        specialSymbols.put("%C3%8D", "Í");
        specialSymbols.put("%C3%93", "Ó");
        specialSymbols.put("%C3%9A", "Ú");
        specialSymbols.put("%C3%91", "Ñ");
    }
    public String DecodificateString(String input){
        if(input != null && input != ""){
            String[] keysArray = specialSymbols.keySet().toArray(new String[0]);
            for(String symbol : keysArray) input = input.replace(symbol, specialSymbols.get(symbol));
            return input;
        }
        return "";
    }
}
