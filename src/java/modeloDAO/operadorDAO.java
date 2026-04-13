/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modeloDAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import modeloVO.OperadorVO;
import util.Conexion;
import util.Crud;

/**
 *
 * @author bogot
 */
public class operadorDAO extends Conexion implements Crud{
     //1. Declarar Variables u objetos    
private Connection conexion;
private PreparedStatement puente;
private ResultSet mensajero;

 private boolean operacion = false;
 private String sql;
 
  public String idOperador="",fechaReporte="",fechaRegistro="",idRecargaFK="";
  
  //2. Receibir los datos del VO
  
    public operadorDAO(OperadorVO operaVO) {
        super();

        try {
            //3. conectarse Base de Datos
            conexion = this.obtenerConexion();

            //4. Traer Datos del VO
            idOperador = operaVO.getIdOperador();
            fechaReporte = operaVO.getFechaReporte();
            fechaRegistro = operaVO.getFechaRegistro();
            idRecargaFK = operaVO.getIdRecargaFK();
        } catch (Exception e) {
            System.out.println("error" + e.toString());
        }
    }

    @Override
    public boolean agregarRegistro() {
        try {
            sql = "insert into operador(fechar_reporte,fecha_registro,id_recarga_fk) values (?,?,?)";
            puente = conexion.prepareStatement(sql);
            puente.setString(1, fechaReporte);
            puente.setString(2, fechaRegistro);
            puente.setString(3, idRecargaFK);
            puente.executeUpdate();
            operacion= true;
            
        } catch (Exception e) {
             System.out.println("error" + e.toString());
        } finally{
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
            sql = "update operador(fechar_reporte=?, fecha_registro=?, id_recarga_fk=?)where idOperador=?";
            puente = conexion.prepareStatement(sql);
            puente.setString(1, fechaReporte);
            puente.setString(2, fechaRegistro);
            puente.setString(3, idRecargaFK);
            puente.setString(4, idOperador);
            puente.executeUpdate();
             
           operacion = true;
            
            
        } catch (Exception e) {
             System.out.println("error" + e.toString());
        } finally{
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
        // Sentencia SQL para eliminar un operador por su ID
        sql = "delete from operador where idOperador = ?";
        
        puente = conexion.prepareStatement(sql);
        
        // Usamos la variable idOperador que aparece en la línea del setString(4, ...)
        puente.setString(1, idOperador);
        
        puente.executeUpdate();
        operacion = true;
        
    } catch (Exception e) {
        // Formato de error idéntico al de tu profesor
        System.out.println("error" + e.toString());
    } finally {
        try {
            this.cerrarConexion();
        } catch (Exception e) {
            // Manejo de excepción al cerrar la conexión
        }
    }
    
    return operacion;
}


       public boolean iniciarSesion(String pasajero, String password){
           try {
               conexion =this.obtenerConexion();
               sql = "select * from operador WHERE id_operador=? and fechar_reporte=?";
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

