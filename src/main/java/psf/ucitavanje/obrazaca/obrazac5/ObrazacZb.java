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
@Table(name = "obrazac_zb")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ObrazacZb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer gen_mysql;

    @Column(name = "gen_interbase")
    private Integer gen_interbase;

    @Column(name = "koji_kvartal")
    private Integer koji_kvartal;

    @Column(name = "tip_obrazca")
    private Integer tip_obrazca;

    @Column(name = "sif_sekret")
    private Integer sif_sekret;

    @Column(name = "razdeo")
    private Integer razdeo;

    @Column(name = "sif_rac")
    private Integer sif_rac;

    @Column(name = "verzija")
    private Integer verzija;

    @Column(name = "dinarski")
    private Integer dinarski;

    @Column(name = "status")
    private String status;

    @Column(name = "poslato_o")
    private Double poslato_o;

    @Column(name = "radna")
    private Double radna;

    @Column(name = "povuceno")
    private Double povuceno;

    @Column(name = "konacno")
    private Double konacno;

    @Column(name = "poslao_nam")
    private Double poslao_nam;

    @Column(name = "poslao_u_org")
    private Double poslao_u_org;

    @Column(name = "poslao_iz_org")
    private Double poslao_iz_org;

    @Column(name = "zaprimio_ver")
    private Integer zaprimio_ver;

    @Column(name = "overio_ver")
    private Double overio_ver;

    @Column(name = "odobrio_ver")
    private Double odobrio_ver;

    @Column(name = "proknjizeno")
    private Double proknjizeno;

    @Column(name = "jbbk_ind_kor")
    private Double jbbk_ind_kor;

    @Column(name = "storno")
    private Double storno;

    @Column(name = "stosifrad")
    private Double stosifrad;

    @Column(name = "opisstorno")
    private Double opisstorno;

    @Column(name = "podigao_status")
    private Double podigao_status;

    @Column(name = "datum_pod_statusa")
    private Double datum_pod_statusa;

    @Column(name = "datum_org")
    private Double datum_org;

    @Column(name = "nivo_konsolidacije")
    private Integer nivo_konsolidacije;

}
