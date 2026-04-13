/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package controlador;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import modeloDAO.pasajeroDAO;
import modeloVO.PasajeroVO;

/**
 *
 * @author bogot
 */
@WebServlet(name = "PasajeroControlador", urlPatterns = {"/Pasajero"})
public class PasajeroControlador extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        

        //1.Recibir los datos de las vistas       
        String idPasajero = request.getParameter("textid");
        String nombrePasajero = request.getParameter("textnombre");
        String clavE = request.getParameter("textclave");
        String telefonO = request.getParameter("texttelefono");
        String correO = request.getParameter("textcorreo");
        String tipoDocumento = request.getParameter("texttipodocumento");
        String numeroDocumento = request.getParameter("textnumerodocumento");
        String fechaRegistro = request.getParameter("textidfecharegistro");
        String activO = request.getParameter("textactivo");
        String recuperarContraseña = request.getParameter("textrecuperarcontraseña");
        int opcion = Integer.parseInt(request.getParameter("opcion"));
        
        //2. quien tiene los datos de forma segura? el VO 
        PasajeroVO pasajeVO = new PasajeroVO(idPasajero, nombrePasajero, clavE, telefonO, correO, tipoDocumento, numeroDocumento,
                fechaRegistro, activO, recuperarContraseña);
        //3. quien hace las operaciones del sistema? el DAO
        
        pasajeroDAO pasaDAO = new pasajeroDAO(pasajeVO);
        
        //4. administrar las operaciones del modulo
        
        switch(opcion){
            case 1: // agregar registro
                if (pasaDAO.agregarRegistro()) {
                    request.setAttribute("mensajeExito", "El pasajero se registro correctamente");                    
                }else{
                    request.setAttribute("mensajeExito", "El pasajero No se registro correctamente");
                }
                request.getRequestDispatcher("RegistrarPasajero.jsp").forward(request, response);
                break;

                case 2: // actualizar registro

                if (pasaDAO.agregarRegistro()) {
                    request.setAttribute("mensajeExito", "El pasajero se actualizo correctamente");
                } else {
                    request.setAttribute("mensajeError", "El pasajero No se actualizo correctamente");
                }
                request.getRequestDispatcher("actualizarpasajero.jsp").forward(request, response);
                break;
                
                case 3: // eliminar registro
                if (pasaDAO.agregarRegistro()) {
                    request.setAttribute("mensajeExito", "El pasajero se elimino correctamente");
                } else {
                    request.setAttribute("mensajeError", "El pasajero No se elimino correctamente");
                }
                request.getRequestDispatcher("eliminarpasajero.jsp").forward(request, response);
                break;
                
                 case 4: // iniciar sesion
                      if (pasaDAO.iniciarSesion(nombrePasajero, clavE)) {
                     request.getRequestDispatcher("menu.jsp").forward(request, response);
                } else {
                    request.setAttribute("mensajeError", "El pasajero 0 la contraseña son incorrectos");
                }
                request.getRequestDispatcher("eliminarpasajero.jsp").forward(request, response);
                break;
                     
                
                     
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
