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
public class OperadorVO {
   public String idOperador,fechaReporte,fechaRegistro,idRecargaFK;

    public OperadorVO(String idOperador, String fechaReporte, String fechaRegistro, String idRecargaFK) {
        this.idOperador = idOperador;
        this.fechaReporte = fechaReporte;
        this.fechaRegistro = fechaRegistro;
        this.idRecargaFK = idRecargaFK;
    }

    public String getIdOperador() {
        return idOperador;
    }

    public void setIdOperador(String idOperador) {
        this.idOperador = idOperador;
    }

    public String getFechaReporte() {
        return fechaReporte;
    }

    public void setFechaReporte(String fechaReporte) {
        this.fechaReporte = fechaReporte;
    }

    public String getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(String fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public String getIdRecargaFK() {
        return idRecargaFK;
    }

    public void setIdRecargaFK(String idRecargaFK) {
        this.idRecargaFK = idRecargaFK;
    }
   
}
