/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Forms;

import Database.ApplicationDatabaseContext;
import Database.User;
import Utilities.IdCreator;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author miku
 */
public class RemoveForm extends HttpServlet {

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
        response.addHeader("Access-Control-","*");
        _context = new ApplicationDatabaseContext();
        Boolean connected = _context.CreateConnection();
        String formatJson = "\"%s\":\"%s\",";
        PrintWriter out = response.getWriter();
        out.println("{");
        if(connected){
            String username = request.getParameter("username"), password = request.getParameter("password");
            if(username != null && password != null){
                try {
                    ResultSet responses = _context.FirstOrDefault("", "users", String.format("username='%s' and password='%s';",username,password));
                    if(responses != null){
                        User user = _context.GetUser(responses);
                        if(user != null){
                            String id = request.getParameter("formId");
                            if(_context.RemoveForm(id, user.GetId())){
                                out.println(String.format(formatJson,"response","ok"));
                                out.println(String.format(formatJson,"statusCode","1"));
                                out.println(String.format(formatJson,"message", "Form removed"));
                                out.flush();
                            }else{
                                out.println(String.format(formatJson,"response","fail"));
                                out.println(String.format(formatJson,"statusCode","2"));
                                out.println(String.format(formatJson,"message",_context.GetLastError()));
                                out.flush();
                            }
                        }else{
                            out.println(String.format(formatJson,"response","fail"));
                            out.println(String.format(formatJson,"statusCode","2"));
                            out.println(String.format(formatJson,"message",_context.GetLastError()));
                            out.flush();
                        }
                    }else{
                        out.println(String.format(formatJson,"response","fail"));
                        out.println(String.format(formatJson,"statusCode","2"));
                        out.println(String.format(formatJson,"message",_context.GetLastError()));
                        out.flush();
                    }
                }catch(Exception ex){
                    out.println(String.format(formatJson,"response","fail"));
                    out.println(String.format(formatJson,"statusCode","3"));
                    out.println(String.format(formatJson,"message",ex));
                    out.flush();
                }
            }else{
                out.println(String.format(formatJson,"response","fail"));
                out.println(String.format(formatJson,"statusCode","2"));
                out.println(String.format(formatJson,"message","User not found"));
                out.flush();
            }
        }else{
            out.println(String.format(formatJson,"response","fail"));
            out.println(String.format(formatJson,"statusCode","3"));
            out.println(String.format(formatJson, "message", _context.GetLastError()));
            out.flush();
        }
        out.println("}");
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
