/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modeloDAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import modeloVO.SoporteVO;
import util.Conexion;
import util.Crud;

/**
 *
 * @author bogot
 */
public class soporteDAO extends Conexion implements Crud{
     //1. Declarar Variables u objetos    
private Connection conexion;
private PreparedStatement puente;
private ResultSet mensajero;

 private boolean operacion = false;
 private String sql;
 
 public String idSoporte="",nombrE="",contraseñA="",operadorFK="",InformacionReporte="";
 
  //2. Receibir los datos del VO
  
    public soporteDAO(SoporteVO sopoVO) {
        super();

        try {

            //3. conectarse Base de Datos
            conexion = this.obtenerConexion();

            //4. Traer Datos del VO
            idSoporte = sopoVO.getIdSoporte();
            nombrE = sopoVO.getNombrE();
            contraseñA = sopoVO.getOperadorFK();
            operadorFK = sopoVO.getOperadorFK();
            InformacionReporte = sopoVO.getInformacionReporte();
        } catch (Exception e) {
            System.out.println("error" + e.toString());
        }
    }

    @Override
    public boolean agregarRegistro() {
        try {
            sql = "insert into soporte(nombre,contraseña,operador_FK,Informacion_reporte) values (?,?,?,?)";
            puente = conexion.prepareStatement(sql);
            puente.setString(1, nombrE);
            puente.setString(2, contraseñA);
            puente.setString(3, operadorFK);
            puente.setString(4, InformacionReporte);
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
            sql = "insert into soporte(nombre,contraseña,operador_FK,Informacion_reporte)where idSoporte=?";
            puente = conexion.prepareStatement(sql);
            puente.setString(1, nombrE);
            puente.setString(2, contraseñA);
            puente.setString(3, operadorFK);
            puente.setString(4, InformacionReporte);
             puente.setString(5, idSoporte);
            puente.executeUpdate();   
            
            operacion = true;


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
public boolean eliminarRegistro() {
    try {
        // SQL para eliminar el registro de soporte
        sql = "delete from soporte where idSoporte = ?";
        
        puente = conexion.prepareStatement(sql);
        
        // Usamos la variable idSoporte (resaltada en tu línea 116)
        puente.setString(1, idSoporte);
        
        puente.executeUpdate();
        operacion = true;
        
    } catch (Exception e) {
        // Mantenemos el formato de salida de error
        System.out.println("error" + e.toString());
    } finally {
        try {
            this.cerrarConexion();
        } catch (Exception e) {
            // Error al cerrar conexión
        }
    }
    
    return operacion;
}


       public boolean iniciarSesion(String pasajero, String password){
           try {
               conexion =this.obtenerConexion();
               sql = "select * from soporte WHERE id_soporte=? and nombre=?";
           } catch (Exception e) {
                System.out.println("Error:" + e.toString()); } finally {
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


