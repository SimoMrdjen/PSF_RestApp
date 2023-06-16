package psf.ucitavanje.obrazaca.IOobrazac.obrazac5_pom;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "obrazac5_pom")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Obrazac5_pom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer REDNI;

    @Column
    private Integer GEN_MYSQL;

    @Column
    private Integer GEN_INTERBASE;

    @Column
    private Integer GODINA;

    @Column
    private Integer VERZIJA;

    @Column
    private Integer KOJI_KVARTAL;

    @Column
    private Integer SIF_SEKRET;

    @Column
    private Integer JBBK;

    @Column
    private Integer JBBK_IND_KOR;

    @Column
    private Integer SIF_RAC;

    @Column
    private Integer RAZDEO;

    @Column
    private Integer OZNAKAGLAVE;

    @Column
    private Integer RED_BROJ_AKT;

    @Column
    private Integer FUNK_KLAS;

    @Column
    private Integer SIN_KONTO;

    @Column
    private Integer KONTO;

    @Column
    private Integer IZVORFIN;

    @Column
    private Integer IZVORFIN_PRE;

    @Column
    private Integer ALINEA;

    @Column
    private Integer DUGG;

    @Column
    private Integer POTG;

    @Column
    private Integer DUGUJE;

    @Column
    private Integer POTRAZUJE;

    @Column
    private Integer REPUBLIKA;

    @Column
    private Integer POKRAJINA;

    @Column
    private Integer OPSTINA;

    @Column
    private Integer OOSO;

    @Column
    private Integer DONACIJE;

    @Column
    private Integer OSTALI;

    @Column
    private Integer UNOSIO;

    @Column
    private Integer UPARENO;

    @Column
    private Integer POTRAZUJE2;
}
