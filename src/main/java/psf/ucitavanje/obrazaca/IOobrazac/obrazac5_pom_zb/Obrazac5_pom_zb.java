package psf.ucitavanje.obrazaca.IOobrazac.obrazac5_pom_zb;

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
@Table(name = "obrazac5_pom_zb")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Obrazac5_pom_zb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer GEN_MYSQL;

    @Column
    private Integer GEN_INTERBASE;

   @Column
    private Integer KOJI_KVARTAL;

    @Column
    private Integer GODINA;

    @Column
    private Integer VERZIJA;

    @Column
    private Integer RADNA;

    @Column
    private Integer SIF_SEKRET;

    @Column
    private Integer RAZDEO;

    @Column
    private Integer JBBK;//jbbk sekretarijata

    @Column
    private Integer JBBK_IND_KOR;

    @Column
    private Integer SIF_RAC;

    @Column
    private Integer DINARSKI;

    @Column
    private Integer STATUS;

    @Column
    private Integer POSLATO_O;

    @Column
    private Integer POVUCENO;

    @Column
    private Integer KONACNO;

    @Column
    private Integer POSLAO_NAM;

    @Column
    private Integer DATUM_DOK;

    @Column
    private Integer PODIGAO_STATUS;

    @Column
    private Integer DATUM_POD_STATUSA;

    @Column
    private Integer POSLAO_U_ORG;

    @Column
    private Integer DATUM_SLANJA;

    @Column
    private Integer POSLAO_IZ_ORG;

    @Column
    private Integer DATUM_ORG;

    @Column
    private Integer ZAPRIMIO_VER;

    @Column
    private Integer OVERIO_VER;

    @Column
    private Integer ODOBRIO_VER;

    @Column
    private Integer PROKNJIZENO;

    @Column
    private Integer XLS;

    @Column
    private Integer STORNO;

    @Column
    private Integer STOSIFRAD;

    @Column
    private String OPISSTORNO;

    @Column
    private Integer GEN_OPENTAB;

}
