/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modeloDAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import modeloVO.PasajeroVO;
import util.Conexion;
import util.Crud;

/**
 *
 * @author bogot
 */
public class pasajeroDAO extends Conexion implements Crud{

    //1. Declarar variables u objetos
    private Connection conexion;
    private PreparedStatement puente;
    private ResultSet mensajero;

    private boolean operacion = false;
    private String sql;
    private String idPasajero = "", nombrePasajero = "", clavE = "", telefonO = "", correO = "", tipoDocumento = "", numeroDocumento = "",
            fechaRegistro = "", activO = "", recuperarContraseña = "";

    //2. Recibir datos del VO
    public pasajeroDAO(PasajeroVO pasVO) {
        super();
        
        try {
            //3. conectarse Base de Datos
        conexion = this.obtenerConexion();

        //4. Traer Datos del VO
        idPasajero = pasVO.getIdPasajero();
        nombrePasajero = pasVO.getNombrePasajero();
        clavE = pasVO.getClavE();
        telefonO = pasVO.getTelefonO();
        correO = pasVO.getCorreO();
        tipoDocumento = pasVO.getTipoDocumento();
        numeroDocumento = pasVO.getTipoDocumento();
        fechaRegistro = pasVO.getFechaRegistro();
        activO = pasVO.getActivO();
        recuperarContraseña = pasVO.getActivO();
        } catch (Exception e) {
            System.out.println("error" + e.toString());
              
        }

      
    }

    @Override
    public boolean agregarRegistro() {
        try {
            sql = "insert into pasajero(nombre_pasajero,clave,telefono,correo,tipo_documento,numero_documento,fecha_registro,activo,recuperar_contraseña) "
                    + "values (?,?,?,?,?,?,?,?,?)";
            
            puente = conexion.prepareStatement(sql);
            puente.setString(1,nombrePasajero);
            puente.setString(2,clavE);
            puente.setString(3,telefonO);
             puente.setString(4,correO);
            puente.setString(5,tipoDocumento);
            puente.setString(6,numeroDocumento);
             puente.setString(7,fechaRegistro);
            puente.setString(8,activO);
            puente.setString(9,recuperarContraseña);
            puente.executeUpdate();
            operacion= true;           
         
        } catch (Exception e) {
            System.out.println("error" + e.toString());
        }finally{
            try {
                this.cerrarConexion();
            } catch (Exception e) {
            }
        } 
        
        return operacion;
        
    }

    @Override
    public boolean actualizarRegistro() {
        try {
            sql = "update pasajero(nombre_pasajero=? ,clave=? ,telefono=?, correo=?, tipo_documento=?, numero_documento=?,"
                    + "fecha_registro=? ,activo=?, recuperar_contraseña=?) where idPasajero=? ";

            puente = conexion.prepareStatement(sql);
            puente.setString(1, nombrePasajero);
            puente.setString(2, clavE);
            puente.setString(3, telefonO);
            puente.setString(4, correO);
            puente.setString(5, tipoDocumento);
            puente.setString(6, numeroDocumento);
            puente.setString(7, fechaRegistro);
            puente.setString(8, activO);
            puente.setString(9, recuperarContraseña);
            puente.setString(10, idPasajero);
            puente.executeUpdate();
           
            operacion = true;

        } catch (Exception e) {
            System.out.println("error" + e.toString());
        } finally {
            try {
                this.cerrarConexion();
            } catch (Exception e) {
            }
        } 
        
        return operacion;
    }

    @Override
    public boolean eliminarRegistro() {   
       

    try {
        // Definimos la sentencia SQL para eliminar
        sql = "delete from pasajero where idPasajero = ?";
        
        // Preparamos la conexión
        puente = conexion.prepareStatement(sql);
        
        // Pasamos el ID del pasajero como parámetro (suponiendo que es el primer ?)
        puente.setString(1, idPasajero);
        
        // Ejecutamos la operación
        puente.executeUpdate();
        operacion = true;
        
    } catch (Exception e) {
        System.out.println("Error al eliminar: " + e.toString());
    } finally {
        try {
            this.cerrarConexion();
        } catch (Exception e) {
             System.out.println("Error al eliminar: " + e.toString());
            // Manejo de error al cerrar
        }
    }
    
    return operacion; 
}
    
    
       public boolean iniciarSesion(String pasajero, String password){
           try {
               conexion =this.obtenerConexion();
               sql = "select * from pasajero WHERE nombre_pasajero=? and clave=?";
               puente = conexion.prepareStatement(sql);
               
               puente.setString(1,pasajero );
               puente.setString(2, password);
               mensajero= puente.executeQuery();
               if (mensajero.next()) {
                   operacion=true;                   
               }
               
               
           } catch (Exception e) {
                System.out.println("Error" + e.toString());
                
           } finally {
            try {
                this.cerrarConexion();
                
            } catch (Exception e) {
                System.out.println("Error" + e.toString());               
            } finally {
                try {
                    this.cerrarConexion();
                } catch (Exception e) {
                    System.out.println("Error" + e.toString());                   
                }
            }
            return operacion;
        }

    }

}


    
    


