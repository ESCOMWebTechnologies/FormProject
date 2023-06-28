/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Question;

import Database.ApplicationDatabaseContext;
import Database.User;
import Utilities.CodificationMap;
import Utilities.JSONFormat;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author miku
 */
@WebServlet(name = "EditQuestion", urlPatterns = {"/Forms/api/EditQuestion"})
public class EditQuestion extends HttpServlet {

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
                        String formId = request.getParameter("formId");
                        if(formId != null){
                            int value = Integer.parseInt(request.getParameter("value"));
                            String question = request.getParameter("question");
                            CodificationMap decoder = new CodificationMap();
                            question = decoder.DecodificateString(question);
                            String questionId = _context.CreateQuestion(formId,question,value);
                            if (questionId == "" || questionId == null) out.println(format.GetLastError());
                            else out.println(format.GetResponseInJson("ok", "1", questionId));
                        }else{
                            String resp = format.GetResponseInJson("fail","2","Error getting the information");
                            if (resp == null) out.println(format.GetLastError());
                            else out.println(resp);
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

}
