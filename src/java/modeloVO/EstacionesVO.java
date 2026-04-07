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
public class EstacionesVO {
    private String idEstacion,nombreEstacion,mapA,lugaresInteres,horarioS,informacionGeneral;

    public EstacionesVO(String idEstacion, String nombreEstacion, String mapA, String lugaresInteres, String horarioS, String informacionGeneral) {
        this.idEstacion = idEstacion;
        this.nombreEstacion = nombreEstacion;
        this.mapA = mapA;
        this.lugaresInteres = lugaresInteres;
        this.horarioS = horarioS;
        this.informacionGeneral = informacionGeneral;
    }

    public String getIdEstacion() {
        return idEstacion;
    }

    public void setIdEstacion(String idEstacion) {
        this.idEstacion = idEstacion;
    }

    public String getNombreEstacion() {
        return nombreEstacion;
    }

    public void setNombreEstacion(String nombreEstacion) {
        this.nombreEstacion = nombreEstacion;
    }

    public String getMapA() {
        return mapA;
    }

    public void setMapA(String mapA) {
        this.mapA = mapA;
    }

    public String getLugaresInteres() {
        return lugaresInteres;
    }

    public void setLugaresInteres(String lugaresInteres) {
        this.lugaresInteres = lugaresInteres;
    }

    public String getHorarioS() {
        return horarioS;
    }

    public void setHorarioS(String horarioS) {
        this.horarioS = horarioS;
    }

    public String getInformacionGeneral() {
        return informacionGeneral;
    }

    public void setInformacionGeneral(String informacionGeneral) {
        this.informacionGeneral = informacionGeneral;
    }
    
}
