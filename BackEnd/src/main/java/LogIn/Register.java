package LogIn;

import java.io.*;
import javax.servlet.*;
import Database.*;
import javax.servlet.http.*;
=======
import Utilities.*;
/**
 *
 * @author miku
 */
public class Register extends HttpServlet {

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
        String formatJson = "{\"%s\":\"%s\"}";
        PrintWriter out = response.getWriter();
        if(connected){
            try{
            }catch(Exception ex){
                String user = request.getParameter("user"), surname = request.getParameter("surname"), username = request.getParameter("username"), password = request.getParameter("password");
                if(username != null && password != null){
                    password = CifrateData.CifratePassword(password);
                    Boolean registered = _context.RegisterUser(surname, surname, username, password);
                    if(registered){
                        out.println(String.format(formatJson,"response","ok"));
                        out.println(String.format(formatJson,"statusCode","1"));
                        out.println(String.format(formatJson,"message","User registered"));
                    }else{
                        out.println(String.format(formatJson,"response","ok"));
                        out.println(String.format(formatJson,"statusCode","2"));
                        out.println(String.format(formatJson,"message",_context.GetLastError()));
                    }
                }
            }catch(Exception ex){
                out.println(String.format(formatJson,"response","fail"));
                out.println(String.format(formatJson,"statusCode","3"));
                out.println(String.format(formatJson,"message",ex.getMessage()));
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