/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modeloDAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import modeloVO.CuentaVO;
import util.Conexion;
import util.Crud;

/**
 *
 * @author bogot
 */
public class cuentaDAO extends Conexion implements Crud{

//1. Declarar Variables u objetos    
    private Connection conexion;
    private PreparedStatement puente;
    private ResultSet mensajero;

    private boolean operacion = false;
    private String sql;

    private String idcuenta = "", pasajeroFK = "", numeroTarjeta = "", saldO = "", fecha_creacion = "";

    //2. Receibir los datos del VO
    public cuentaDAO(CuentaVO cuentVO) {
        super();

       
        
        try {
            //3. conectarse Base de Datos
            conexion = this.obtenerConexion();

            //4. Traer Datos del VO
            idcuenta = cuentVO.getIdPasajero();
            pasajeroFK = cuentVO.getPasajeroFK();
            numeroTarjeta = cuentVO.getNumeroTarjeta();
            saldO = cuentVO.getSaldO();
            fecha_creacion = cuentVO.getFecha_creacion();
            puente.executeUpdate();
            operacion= true;
            
        } catch (Exception e) {
            System.out.println("error" + e.toString());
        }
  }

    @Override
    public boolean agregarRegistro() {
        try {
            sql = "insert into cuenta(pasajero_FK,numero_tarjeta,saldo,fecha_creacion)values (?,?,?,?)";            
            puente = conexion.prepareStatement(sql);
            puente.setString(1,pasajeroFK);
            puente.setString(2,numeroTarjeta);
            puente.setString(3,saldO);
            puente.setString(4,fecha_creacion);
            
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
            sql = "update cuenta(pasajeroFK=? ,numeroTarjeta=?, saldO=?, fecha_creacion=?) where idcuenta=? ";           
            puente = conexion.prepareStatement(sql);
            puente.setString(1,pasajeroFK);
            puente.setString(2,numeroTarjeta);
            puente.setString(3,saldO);
            puente.setString(4,fecha_creacion);
            puente.setString(5,idcuenta);
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
        // Definimos la sentencia para borrar la fila usando el idcuenta
        sql = "delete from cuenta where idcuenta = ?";
        
        // Preparamos la sentencia con la conexión actual
        puente = conexion.prepareStatement(sql);
        
        // Pasamos la variable idcuenta que aparece al final de tu método actualizar
        puente.setString(1, idcuenta);
        
        // Ejecutamos la instrucción
        puente.executeUpdate();
        
        // Si todo sale bien, marcamos la operación como verdadera
        operacion = true;
        
    } catch (Exception e) {
        // Imprimimos el error específico de esta entidad
        System.out.println("error" + e.toString());
    } finally {
        try {
            this.cerrarConexion();
        } catch (Exception e) {
            // Manejo de error al cerrar
        }
    }
    
    return operacion;
}   


       public boolean iniciarSesion(String pasajero, String password){
           try {
               conexion =this.obtenerConexion();
               sql = "select * from cuenta WHERE id_pasajero=? and numero_tarjeta=?";
           } catch (Exception e) {
                System.out.println("Error:" + e.toString());
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

  
          
          
