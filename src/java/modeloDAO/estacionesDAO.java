/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modeloDAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import modeloVO.EstacionesVO;
import util.Conexion;
import util.Crud;

/**
 *
 * @author bogot
 */
public class estacionesDAO extends Conexion implements Crud{
    //1. Declarar Variables u objetos    
private Connection conexion;
private PreparedStatement puente;
private ResultSet mensajero;

 private boolean operacion = false;
 private String sql;
 
  private String idEstacion="",nombreEstacion="",mapA="",lugaresInteres="",horarioS="",informacionGeneral="";
  
  //2. Receibir los datos del VO
  
  public estacionesDAO(EstacionesVO estacioVO){
  super();
  
  
   
        try {
            //3. conectarse Base de Datos
            conexion = this.obtenerConexion();

            //4. Traer Datos del VO
            idEstacion = estacioVO.getIdEstacion();
            nombreEstacion = estacioVO.getNombreEstacion();
            mapA = estacioVO.getMapA();
            lugaresInteres = estacioVO.getLugaresInteres();
            horarioS = estacioVO.getHorarioS();
            informacionGeneral = estacioVO.getInformacionGeneral();
            puente.executeUpdate();
            operacion= true;

        } catch (Exception e) {
            System.out.println("error" + e.toString());
        }

    }

    @Override
    public boolean agregarRegistro() {
        try {
            sql = "insert into estaciones(nombre_estacion,mapa,lugares_interes,horarios,informacion_general) values (?,?,?,?,?)";
            puente = conexion.prepareStatement(sql);
            puente.setString(1, nombreEstacion);
            puente.setString(2, mapA);
            puente.setString(3, lugaresInteres);
            puente.setString(4, horarioS);
            puente.setString(5, informacionGeneral);

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
            sql = "update estaciones(nombre_estacion=?,mapa=?,lugares_interes=?,horarios=?,informacion_general=?) where idEstacion=?";
            puente = conexion.prepareStatement(sql);
            puente.setString(1, nombreEstacion);
            puente.setString(2, mapA);
            puente.setString(3, lugaresInteres);
            puente.setString(4, horarioS);
            puente.setString(5, informacionGeneral);
            puente.setString(6, idEstacion);
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
        // SQL para eliminar de la tabla estaciones
        sql = "delete from estaciones where idEstacion = ?";
        
        puente = conexion.prepareStatement(sql);
        
        // Usamos la variable idEstacion que aparece en tu línea 24
        puente.setString(1, idEstacion);
        
        puente.executeUpdate();
        operacion = true;
        
    } catch (Exception e) {
        // Mantenemos el formato de error de tu imagen
        System.out.println("error" + e.toString());
    } finally {
        try {
            this.cerrarConexion();
        } catch (Exception e) {
            // Error al cerrar
        }
    }
    
    return operacion;
}


       public boolean iniciarSesion(String pasajero, String password){
           try {
               conexion =this.obtenerConexion();
               sql = "select * from estaciones WHERE id_estacion=? and nombre_estacion=?";
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


