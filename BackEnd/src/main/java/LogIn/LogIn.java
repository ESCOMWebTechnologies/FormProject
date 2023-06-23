/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package LogIn;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import Database.*;
import java.sql.*;
import Utilities.*;
import java.util.Vector;

/**
 *
 * @author miku
 */
public class LogIn extends HttpServlet {

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
        //response.addHeader("Access-Control-","*");
        _context = new ApplicationDatabaseContext();
        Boolean connected = _context.CreateConnection();
        PrintWriter out = response.getWriter();
        String path = this.getServletContext().getRealPath("/sources/json/ResponseJSON.json");
        JSONFormat format = new JSONFormat(path);
        if(connected){
            String username = request.getParameter("username"), password = request.getParameter("password");
            if(username != null && password != null){
                try {
                    ResultSet responses = _context.FirstOrDefault("", "users", String.format("username='%s' and password='%s';",username,password));
                    User user = _context.GetUser(responses);
                    if(responses != null){
                        String resp = format.GetResponseInJson("ok","1",user.GetAllUserInformation());
                        if (resp == null) out.println(format.GetLastError());
                        else out.println(resp);
                    }else{
                        String resp = format.GetResponseInJson("fail","2","User not found");
                        if (resp == null) out.println(format.GetLastError());
                        else out.println(resp);
                    }
                }catch(Exception ex){
                    String resp = format.GetResponseInJson("fail","3",ex.getMessage());
                    if (resp == null) out.println(format.GetLastError());
                    else out.println(resp);
                }
            }else{
                String resp = format.GetResponseInJson("fail","2","User not found");
                    if (resp == null) out.println(format.GetLastError());
                    else out.println(resp);
            }
        }else{
            String resp = format.GetResponseInJson("fail","3",_context.GetLastError());
            if (resp == null) out.println(format.GetLastError());
            else out.println(resp);
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
