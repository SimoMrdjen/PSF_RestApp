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

//    @OneToMany(mappedBy = "REDNI", fetch = FetchType.LAZY,
//            cascade = {CascadeType.PERSIST, CascadeType.MERGE)
//    private Set<Obrazac5_pom> stavke = new HashSet<Obrazac5_pom>();

    @Column
    private Integer GEN_INTERBASE;

    @Column(nullable = false)
    private Integer KOJI_KVARTAL;

    @Column(nullable = false)
    private Integer GODINA;

    @Column(nullable = false)
    private Integer VERZIJA;

    @Column(nullable = false)
    private Integer RADNA;

    @Column(nullable = false)
    private Integer SIF_SEKRET;

    @Column
    private Integer RAZDEO;

    @Column(nullable = false)
    private Integer JBBK;//jbbk sekretarijata

    @Column(nullable = false)
    private Integer JBBK_IND_KOR;

    @Column(nullable = false)
    private Integer SIF_RAC;

    @Column(nullable = false)
    private Integer DINARSKI;

    @Column(nullable = false)
    private Integer STATUS;

    @Column(nullable = false)
    private Integer POSLATO_O;

    @Column(nullable = false)
    private Integer POVUCENO;

    @Column(nullable = false)
    private Integer KONACNO;

    @Column
    private Integer POSLAO_NAM;

    @Column(nullable = false)
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

    @Column(nullable = false)
    private Integer PROKNJIZENO;

    @Column(nullable = false)
    private Integer XLS;

    @Column(nullable = false)
    private Integer STORNO;

    @Column(nullable = false)
    private Integer STOSIFRAD;

    @Column
    private String OPISSTORNO;

    @Column(nullable = false)
    private Integer GEN_OPENTAB;

}
