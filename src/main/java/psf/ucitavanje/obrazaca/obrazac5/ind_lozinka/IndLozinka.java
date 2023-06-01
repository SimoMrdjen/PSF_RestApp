package psf.ucitavanje.obrazaca.obrazac5.ind_lozinka;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ind_lozinka")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class IndLozinka {
    @Id
    private Integer sifraradnika;
    @Column
    private Integer za_sif_sekret;
    @Column
    private Integer za_sif_rac;
    @Column
    private Integer sif_oblast;
    @Column
    private String ime;
    @Column
    private String lozinka;
    @Column
    private String sncert;
    @Column
    private String sncert_rez;
    @Column
    private Integer  javno_pred;
    @Column
    private Integer  sifra_pp;

}
