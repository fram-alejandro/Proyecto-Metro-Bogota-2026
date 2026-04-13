<%-- 
    Document   : registrarUsuario
    Created on : 10-abr-2026, 20:45:19
    Author     : bogot
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Registrar Usuario</title>
    </head>
    <body>
        <h1>Registrar Usuario</h1>
        <form method="post" action="Pasajero">
            <table>
                <tr>
                  Pasajero:<br>
                <input type="text" name="textnombre"><br>
                 clave:<br>
                <input type="text" name="textclave">
                </tr>
            </table>
            <button>Registrar </button>
            <input type="hidden" value="1" name="opcion"></input>
            
        </form>
        
        <div style="color:red;" >
            <% 
            if (request.getAttribute("mensajeError")!= null){
            
            %>
            ${mensajeExito}
            <%}else {
                %>
                <div style="color:greenyellow">${mensajeExito}</div>
                 <%} %>   
            
        </div>
     
    </body>
</html>
