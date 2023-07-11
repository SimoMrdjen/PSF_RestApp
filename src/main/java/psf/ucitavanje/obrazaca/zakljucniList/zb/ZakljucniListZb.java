package psf.ucitavanje.obrazaca.zakljucniList.zb;

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
@Table(name = "OBRAZAC_ZAK_LIST_ZB")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ZakljucniListZb {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer GEN_MYSQL;

//    @OneToMany(mappedBy = "REDNI", fetch = FetchType.LAZY,
//            cascade = {CascadeType.PERSIST, CascadeType.MERGE)
//    private Set<Obrazac5_pom> stavke = new HashSet<Obrazac5_pom>();

    @Column
    private Integer GEN_INTERBASE;

    @Column(nullable = false)
    private Integer GEN_OPENTAB = 0;

    @Column(nullable = false)
    private Integer GEN_APVDBK = 0;

    @Column(nullable = false)
    private Integer KOJI_KVARTAL;

    @Column(nullable = false)
    private Integer GODINA;

    @Column(nullable = false)
    private Integer VERZIJA ;

    @Column(nullable = false)
    private Integer RADNA = 1;

    @Column(nullable = false)
    private Integer SIF_SEKRET;

    @Column(nullable = false)
    private Integer RAZDEO;

    @Column(nullable = false)
    private Integer JBBK;

    @Column(nullable = false)
    private Integer JBBK_IND_KOR;

    @Column(nullable = false)
    private Integer SIF_RAC = 1;

    @Column(nullable = false)
    private Integer DINARSKI = 1;

    @Column(nullable = false)
    private Integer STATUS = 0;

    @Column(nullable = false)
    private Integer POSLATO_O = 0;

    @Column(nullable = false)
    private Integer POVUCENO = 0;

    @Column(nullable = false)
    private Integer KONACNO = 0;

    private Integer POSLAO_NAM = 0;

    @Column(nullable = false)
    private Integer DATUM_DOK;

    private Integer PODIGAO_STATUS;

    private Integer DATUM_POD_STATUSA;

    private Integer POSLAO_U_ORG = 0;

    private Integer DATUM_SLANJA;

    private Integer POSLAO_IZ_ORG;

    private Integer DATUM_ORG;

    private Integer ZAPRIMIO_VER;

    private Integer OVERIO_VER;

    private Integer ODOBRIO_VER;

    @Column(nullable = false)
    private Integer PROKNJIZENO = 0;

    @Column(nullable = false)
    private Integer XLS = 0;

    @Column(nullable = false)
    private Integer STORNO = 0;

    @Column(nullable = false)
    private Integer STOSIFRAD = 0;

    private Integer OPISSTORNO;

}
