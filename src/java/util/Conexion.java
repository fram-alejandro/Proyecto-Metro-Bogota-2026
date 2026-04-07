/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author bogot
 */
public class Conexion {

    //1. declarar variables y objetos
    private String driver, user, password, dataBase, urlBd, port;
    private Connection conexion;

    //2. Asignar Valores
    public Conexion() {
        driver = "com.mysql.jdbc.Driver";
        user = "root";
        password = "";
        dataBase = "metro_bogota_2_12";
        port = "3306";
        urlBd = "jdbc:mysql://localhost:" + port + "/" + dataBase;

        //3. conectar
        try {
            Class.forName(driver).newInstance();
            conexion = DriverManager.getConnection(urlBd, user, password);
            System.out.println("Conexion ok!");
        } catch (Exception e) {
            System.err.println("Error al conectarse!" + e.toString());
        }
    }

    public Connection obtenerConexion() {
        return conexion;
    }
    
    public Connection cerrarConexion() throws SQLException{
        conexion.close();
        conexion = null;
        return conexion;
    }
    public static void main(String[] args){
    new Conexion();
    }

}
