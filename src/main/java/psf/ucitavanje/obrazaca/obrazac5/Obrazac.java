package psf.ucitavanje.obrazaca.obrazac5;

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
@Table(name = "obrazac")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Obrazac {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer gen_mysql;

    @Column(name = "gen_interbase")
    private Integer gen_interbase;

    @Column(name = "redni")
    private Integer redni;

    @Column(name = "verzija")
    private Integer verzija;

    @Column(name = "koji_kvartal")
    private Integer koji_kvartal;

    @Column(name = "sif_sekret")
    private Integer sif_sekret;

    @Column(name = "sif_rac")
    private Integer sif_rac;

    @Column(name = "razdeo")
    private Integer razdeo;

    @Column(name = "oznakaop")
    private Integer oznakaop;

    @Column(name = "dinarski")
    private Integer dinarski;

    @Column(name = "opis")
    private String opis;

    @Column(name = "planprihoda")
    private Double planprihoda;

    @Column(name = "republika")
    private Double republika;

    @Column(name = "pokrajina")
    private Double pokrajina;

    @Column(name = "opstina")
    private Double opstina;

    @Column(name = "ooso")
    private Double ooso;

    @Column(name = "donacije")
    private Double donacije;

    @Column(name = "ostali")
    private Double ostali;

    @Column(name = "godplan")
    private Integer godplan;

    @Column(name = "kvplan")
    private Double kvplan;

    @Column(name = "izvrsenje")
    private Double izvrsenje;

    @Column(name = "rep_b")
    private Double rep_b;

    @Column(name = "pok_b")
    private Double pok_b;

    @Column(name = "ops_b")
    private Double ops_b;

    @Column(name = "ooso_b")
    private Double ooso_b;

    @Column(name = "dona_b")
    private Double dona_b;

    @Column(name = "ost_b")
    private Double ost_b;

    @Column(name = "izvrs_bit")
    private Double izvrs_bit;

    @Column(name = "izvrs_sop")
    private Double izvrs_sop;

    @Column(name = "unosio")
    private Integer unosio;

    @Column(name = "za_unos")
    private Integer za_unos;

    @Column(name = "tip_obrazca")
    private Integer tip_obrazca;

    @Column(name = "jbbk_ind_kor")
    private Integer jbbk_ind_kor;

    @Column(name = "nivo_konsolidacije")
    private Integer nivo_konsolidacije;

}
