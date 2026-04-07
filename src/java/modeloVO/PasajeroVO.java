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
public class PasajeroVO {
    public String idPasajero,nombrePasajero,clavE,telefonO,correO,tipoDocumento,numeroDocumento,
      fechaRegistro,activO,recuperarContraseña;

    public PasajeroVO(String idPasajero, String nombrePasajero, String clavE, String telefonO, String correO, String tipoDocumento, String numeroDocumento, String fechaRegistro, String activO, String recuperarContraseña) {
        this.idPasajero = idPasajero;
        this.nombrePasajero = nombrePasajero;
        this.clavE = clavE;
        this.telefonO = telefonO;
        this.correO = correO;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.fechaRegistro = fechaRegistro;
        this.activO = activO;
        this.recuperarContraseña = recuperarContraseña;
    }

    public String getIdPasajero() {
        return idPasajero;
    }

    public void setIdPasajero(String idPasajero) {
        this.idPasajero = idPasajero;
    }

    public String getNombrePasajero() {
        return nombrePasajero;
    }

    public void setNombrePasajero(String nombrePasajero) {
        this.nombrePasajero = nombrePasajero;
    }

    public String getClavE() {
        return clavE;
    }

    public void setClavE(String clavE) {
        this.clavE = clavE;
    }

    public String getTelefonO() {
        return telefonO;
    }

    public void setTelefonO(String telefonO) {
        this.telefonO = telefonO;
    }

    public String getCorreO() {
        return correO;
    }

    public void setCorreO(String correO) {
        this.correO = correO;
    }

    public String getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(String tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getNumeroDocumento() {
        return numeroDocumento;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
    }

    public String getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(String fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public String getActivO() {
        return activO;
    }

    public void setActivO(String activO) {
        this.activO = activO;
    }

    public String getRecuperarContraseña() {
        return recuperarContraseña;
    }

    public void setRecuperarContraseña(String recuperarContraseña) {
        this.recuperarContraseña = recuperarContraseña;
    }
    
}
