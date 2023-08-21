package psf.ucitavanje.obrazaca.kontni_plan;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "KONTNI_PLAN")
public class KontniPlan {
    @Id
    @Column(name = "SUB_KONTO")
    private Integer subKonto;

    @Column(name = "KLASA")
    private Integer klasa;

    @Column(name = "KATEGORIJA")
    private Integer kategorija;

    @Column(name = "SIF_GRUPE")
    private Integer sifGrupe;

    @Column(name = "SIN_KONTO")
    private Integer sinKonto;

    @Column(name = "KONTO5")
    private Integer konto5;

    @Column(name = "DNAZIVSUB_KONTO")
    private String dNazivSubKonto;
}
