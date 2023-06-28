/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Answer;

import Database.ApplicationDatabaseContext;
import Database.Question;
import Database.User;
import Utilities.CodificationMap;
import Utilities.JSONFormat;
import Utilities.OutputReader;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Vector;
import java.util.concurrent.CompletableFuture;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author miku
 */
public class CreateAnswer extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    private ApplicationDatabaseContext _context;
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        _context = new ApplicationDatabaseContext();
        Boolean connected = _context.CreateConnection();
        PrintWriter out = response.getWriter();
        String path = this.getServletContext().getRealPath("/sources/json/ResponseJSON.json");
        JSONFormat format = new JSONFormat(path);
        if(connected){
            try{
                String username = request.getParameter("username"), password = request.getParameter("password");
                if(username != null && password != null){
                    //password = CifrateData.CifratePassword(password);
                    User userRegistered = _context.GetUser(_context.FirstOrDefault("", "users", String.format("username='%s' and password='%s';",username,password)));
                    if(userRegistered != null){
                        String questionId = request.getParameter("questionId");
                        String param=request.getParameter("param");
                        //Default answers
                        if(param != null){
                            if(questionId != null){
                                String answer = request.getParameter("answer");
                                CodificationMap decoder = new CodificationMap();
                                answer = decoder.DecodificateString(answer);
                                String answerId = _context.CreateAnswer(userRegistered.GetId(),questionId,answer);
                                if (answerId == "" || answerId == null) out.println(format.GetLastError());
                                else out.println(format.GetResponseInJson("ok", "1", "Complete"));
                            }else{
                                String resp = format.GetResponseInJson("fail","2","Error getting the information");
                                if (resp == null) out.println(format.GetLastError());
                                else out.println(resp);
                            }   
                        }else{
                            if(questionId != null){
                                String answer = request.getParameter("answer"),formId = request.getParameter("formId");
                                CodificationMap decoder = new CodificationMap();
                                Question question = _context.GetQuestion(questionId);
                                answer = decoder.DecodificateString(answer);
                                //Evaluate answer with python
                                String answerId = _context.CreateAnswer(userRegistered.GetId(),questionId,answer,10);
                                if (answerId == "" || answerId == null || formId == null || formId == "") out.println(format.GetLastError());
                                else{
                                    if(ExecuteScript(this.getServletContext().getRealPath("/Python/main.py"),formId,question.GetQuestion(),questionId))
                                        out.println(format.GetResponseInJson("ok", "1", "Complete"));
                                    else{
                                        out.println(format.GetResponseInJson("ok", "2", "The execution fail"));
                                    }
                                }
                                
                            }else{
                                String resp = format.GetResponseInJson("fail","2","Error getting the information");
                                if (resp == null) out.println(format.GetLastError());
                                else out.println(resp);
                            }
                        }
                    }else{
                        String resp = format.GetResponseInJson("ok","2",_context.GetLastError());
                        if (resp == null) out.println(format.GetLastError());
                        else out.println(resp);
                    }
                }
            }catch(Exception ex){
                String resp = format.GetResponseInJson("fail","3",ex.getMessage());
                if (resp == null) out.println(format.GetLastError());
                else out.println(resp);
            }
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    private boolean ExecuteScript(String realPath, String formId, String question, String questionId) throws IOException, InterruptedException {
        String pythonScriptPath = realPath;
        String[] command = {"python", pythonScriptPath, "--formId", formId, "--questionId", questionId};
        ProcessBuilder processBuilder = new ProcessBuilder(command);
        processBuilder.redirectErrorStream(true);
        processBuilder.redirectOutput(ProcessBuilder.Redirect.PIPE);
        Process process = processBuilder.start();
        Vector<String> lines = new Vector<>();
        OutputReader outputReader = new OutputReader(process, lines);
        Thread outputThread = new Thread(outputReader);
        outputThread.start();
        try {
            outputThread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        int exitCode = process.waitFor();
        for (String line : lines) {
            System.out.println(line);
        }
        return exitCode == 0;
    }


}
