/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Utilities;
import Database.Answer;
import Database.Form;
import Database.Question;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import Utilities.Pair;
import java.net.URL;
import java.util.Vector;
/**
 *
 * @author miku
 */
public class JSONFormat {
    private String _template;
    private static String _lastError;
    private static String _path;
    public JSONFormat(String path){
        _template = "";
        _path = path;
        init();
    }
    public String GetLastError(){
        return _lastError;
    }
    private void init() {
        try{
            BufferedReader buffer = new BufferedReader(new FileReader(new File(_path)));
            StringBuilder builder = new StringBuilder();
            String line = "";
            while((line = buffer.readLine()) != null) builder.append(line);
            _template = builder.toString();
            buffer.close();
        }catch(Exception ex){
            _lastError = ex.getMessage();
        }
    }
    public String GetResponseInJson(String message, String code, Vector<Pair<String,String>> data){
        try{
            String json = _template.replace("\"response\" : \"\"",String.format("\n\"response\" : \"%s\"",message));
            json = json.replace("\"statusCode\" : \"\"",String.format("\n\"statusCode\" : \"%s\"",code));
            if(data.size() == 1) json = json.replace("\"message\" : \"\"",String.format("\n\"message\" : \"%s\"",data.elementAt(0)));
            else{
                String response = "\"%s\":\"%s\"";
                String responses = "";
                int i = 0;
                for(Pair<String,String> element : data){ if(i < data.size()-1) responses += ("\n"+String.format(response,element.first,element.second)+ ","); else responses += ("\n"+String.format(response,element.first,element.second))+"\n"; i++;}
                json = json.replace("\"message\" : {}",String.format("\n\"data\" : {%s}\n",responses));
            }
            return json;
        }catch(Exception ex){
            _lastError = ex.getMessage();
        }
        return "";
    }
    public String GetResponseInJson(String message, String code, String data){
        try{
            String json = _template.replace("\"response\" : \"\"",String.format("\n\"response\" : \"%s\"",message));
            json = json.replace("\"statusCode\" : \"\"",String.format("\n\"statusCode\" : \"%s\"",code));
            json = json.replace("\"message\" : {}",String.format("\n\"message\" : \"%s\"",data));
            return json;
        }catch(Exception ex){
            _lastError = ex.getMessage();
        }
        return "";
    }
    public String GetFormResponseInJson(String message, String code, Vector<Vector<Pair<String,String>>> data){
        try{
            String json = _template.replace("\"response\" : \"\"",String.format("\n\"response\" : \"%s\"",message));
            json = json.replace("\"statusCode\" : \"\"",String.format("\n\"statusCode\" : \"%s\"",code));
            String response = "\"%s\":\"%s\"";
            String responses = "";
            int j = 0;
            for(Vector<Pair<String,String>> elements : data){ 
                responses += "\n{";
                int i = 0;
                for(Pair<String,String> element : elements){
                    if(i < elements.size()-1) responses += ("\n"+String.format(response,element.first,element.second)+ ","); else responses += ("\n"+String.format(response,element.first,element.second))+"\n"; i++;
                }
                if(j < data.size()-1) responses += "\n},";
                else responses += "\n}\n";
                j++;
            }
            json = json.replace("\"message\" : {}",String.format("\n\"data\" : [%s]\n",responses));
            return json;
        }catch(Exception ex){
            _lastError = ex.getMessage();
        }
        return "";
    }
    public String GetFormAndQuestions(String message, String code, Pair<Form,Vector<Question>> data){
        if(message != null && code != null && data != null){
            try{
                String json = _template.replace("\"response\" : \"\"",String.format("\n\"response\" : \"%s\"",message));
                json = json.replace("\"statusCode\" : \"\"",String.format("\n\"statusCode\" : \"%s\"",code));
                String response = "\"%s\":\"%s\"";
                String responses = "";
                responses += String.format("\"formName\":\"%s\",\n",data.first.GetFormName());
                responses += String.format("\"questionNumber\":\"%d\",\n",data.first.GetQuestionNumber());
                Vector<Question> questions = data.second;
                responses += "\"questions\":[";
                int end = questions.size(), i = 0;
                for(Question question : questions){
                    responses += "{\n";
                    responses += String.format("\"id\":\"%s\",",question.GetId());
                    responses += String.format("\"question\":\"%s\",",question.GetQuestion());
                    responses += String.format("\"sourcePath\":\"%s\"",question.GetSourcePath());
                    if(i < end)
                        responses += "},\n";
                    else
                        responses += "}";
                    i++;
                }
                if(responses.charAt(responses.length() - 2) == ','){
                    String originalString = responses;
                    responses = originalString.substring(0, originalString.length() - 2);
                }
                responses += "]\n";
                String st = String.format("\n\"message\" : {%s}\n",responses);
                json = json.replace("\"message\" : {}",st);
                return json;
            }catch(Exception ex){
                _lastError = ex.getMessage();
            }
        }else{
            _lastError = "All information is missing";
        }
        return "";
    }
    public String GetFormQuestionAndAnswers(String message, String code, Pair<Form,Vector<Pair<Question,Vector<Answer>>>> data){
        if(message != null && code != null && data != null){
            try{
                String json = _template.replace("\"response\" : \"\"",String.format("\n\"response\" : \"%s\"",message));
                json = json.replace("\"statusCode\" : \"\"",String.format("\n\"statusCode\" : \"%s\"",code));
                String response = "\"%s\":\"%s\"";
                String responses = "";
                responses += String.format("\"formName\":\"%s\",\n",data.first.GetFormName());
                responses += String.format("\"questionNumber\":\"%d\",\n",data.first.GetQuestionNumber());
                Vector<Pair<Question,Vector<Answer>>> questions = data.second;
                responses += "\"questions\":[";
                int end = questions.size(), i = 0;
                for(Pair<Question,Vector<Answer>> dataQuestion : questions){
                    responses += "{\n";
                    responses += String.format("\"id\":\"%s\",", dataQuestion.first.GetId());
                    responses += String.format("\"question\":\"%s\",", dataQuestion.first.GetQuestion());
                    responses += String.format("\"sourcePath\":\"%s\",", dataQuestion.first.GetSourcePath());
                    String responses2 = "";
                    Vector<Answer> answers = dataQuestion.second;
                    responses += "\"answers\":[";
                    int end2 = answers.size(), i2 = 0;
                    for(Answer answer : answers){
                        responses2 += "{\n";
                        responses2 += String.format("\"id\":\"%s\",",answer.GetId());
                        responses2 += String.format("\"answer\":\"%s\",",answer.GetAnswer());
                        responses2 += String.format("\"value\":\"%s\",",answer.GetValue());
                        responses2 += String.format("\"userId\":\"%s\"",answer.GetUserId());
                        if(i2 < end2)
                            responses2 += "},\n";
                        else
                            responses2 += "}";
                        i2++;
                    }
                    if(responses2.charAt(responses2.length() - 2) == ','){
                        String originalString = responses2;
                        responses2 = originalString.substring(0, originalString.length() - 2);
                    }
                    responses += responses2;
                    responses += "]\n";
                    if(i < end)
                        responses += "},\n";
                    else
                        responses += "}";
                    i++;
                }
                if(responses.charAt(responses.length() - 2) == ','){
                    String originalString = responses;
                    responses = originalString.substring(0, originalString.length() - 2);
                }
                responses += "]\n";
                String st = String.format("\n\"message\" : {%s}\n",responses);
                json = json.replace("\"message\" : {}",st);
                return json;
            }catch(Exception ex){
                _lastError = ex.getMessage();
            }
        }else{
            _lastError = "All information is missing";
        }
        return "";
    }
    public String GetQuestionAndAnswers(String message, String code, Pair<Question,Vector<Answer>> data){
        if(message != null && code != null && data != null){
            try{
                String json = _template.replace("\"response\" : \"\"",String.format("\n\"response\" : \"%s\"",message));
                json = json.replace("\"statusCode\" : \"\"",String.format("\n\"statusCode\" : \"%s\"",code));
                String response = "\"%s\":\"%s\"";
                String responses = "";
                responses += String.format("\"questionId\":\"%s\",\n",data.first.GetId());
                responses += String.format("\"question\":\"%s\",\n",data.first.GetQuestion());
                Vector<Answer> answers = data.second;
                responses += "\"answers\":[";
                int end = answers.size(), i = 0;
                for(Answer answer : answers){
                    responses += "{\n";
                    responses += String.format("\"id\":\"%s\",",answer.GetId());
                    responses += String.format("\"answer\":\"%s\",",answer.GetAnswer());
                    responses += String.format("\"value\":\"%s\",",answer.GetValue());
                    responses += String.format("\"userId\":\"%s\"",answer.GetUserId());
                    if(i < end)
                        responses += "},\n";
                    else
                        responses += "}";
                    i++;
                }
                if(responses.charAt(responses.length() - 2) == ','){
                    String originalString = responses;
                    responses = originalString.substring(0, originalString.length() - 2);
                }
                responses += "]\n";
                String st = String.format("\n\"message\" : {%s}\n",responses);
                json = json.replace("\"message\" : {}",st);
                return json;
            }catch(Exception ex){
                _lastError = ex.getMessage();
            }
        }else{
            _lastError = "All information is missing";
        }
        return "";
    }
}
