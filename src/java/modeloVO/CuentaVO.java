/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package modeloVO;

/**
 *
 * @author bogot
 */
public class CuentaVO {
    private String idPasajero,pasajeroFK,numeroTarjeta,saldO,fecha_creacion;

    public CuentaVO(String idPasajero, String pasajeroFK, String numeroTarjeta, String saldO, String fecha_creacion) {
        this.idPasajero = idPasajero;
        this.pasajeroFK = pasajeroFK;
        this.numeroTarjeta = numeroTarjeta;
        this.saldO = saldO;
        this.fecha_creacion = fecha_creacion;
    }

    public String getIdPasajero() {
        return idPasajero;
    }

    public void setIdPasajero(String idPasajero) {
        this.idPasajero = idPasajero;
    }

    public String getPasajeroFK() {
        return pasajeroFK;
    }

    public void setPasajeroFK(String pasajeroFK) {
        this.pasajeroFK = pasajeroFK;
    }

    public String getNumeroTarjeta() {
        return numeroTarjeta;
    }

    public void setNumeroTarjeta(String numeroTarjeta) {
        this.numeroTarjeta = numeroTarjeta;
    }

    public String getSaldO() {
        return saldO;
    }

    public void setSaldO(String saldO) {
        this.saldO = saldO;
    }

    public String getFecha_creacion() {
        return fecha_creacion;
    }

    public void setFecha_creacion(String fecha_creacion) {
        this.fecha_creacion = fecha_creacion;
    }
    
    
}
