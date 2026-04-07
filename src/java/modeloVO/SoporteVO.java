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
public class SoporteVO {
    public String idSoporte,nombrE,contraseñA,operadorFK,InformacionReporte;

    public SoporteVO(String idSoporte, String nombrE, String contraseñA, String operadorFK, String InformacionReporte) {
        this.idSoporte = idSoporte;
        this.nombrE = nombrE;
        this.contraseñA = contraseñA;
        this.operadorFK = operadorFK;
        this.InformacionReporte = InformacionReporte;
    }

    public String getIdSoporte() {
        return idSoporte;
    }

    public void setIdSoporte(String idSoporte) {
        this.idSoporte = idSoporte;
    }

    public String getNombrE() {
        return nombrE;
    }

    public void setNombrE(String nombrE) {
        this.nombrE = nombrE;
    }

    public String getContraseñA() {
        return contraseñA;
    }

    public void setContraseñA(String contraseñA) {
        this.contraseñA = contraseñA;
    }

    public String getOperadorFK() {
        return operadorFK;
    }

    public void setOperadorFK(String operadorFK) {
        this.operadorFK = operadorFK;
    }

    public String getInformacionReporte() {
        return InformacionReporte;
    }

    public void setInformacionReporte(String InformacionReporte) {
        this.InformacionReporte = InformacionReporte;
    }
    
}
