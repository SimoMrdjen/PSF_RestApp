package psf.ucitavanje.obrazaca.obrazac5;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@Table(name = "obrazac5")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Obrazac5 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "oznaka_op")
    private Integer oznakaOp;

    @Column(name = "konto")
    private Integer konto;

    @Column(name = "opis")
    private String opis;

    @Column(name = "planirano")
    private Double planirano;

    @Column(name = "ukupno_ostvareno")
    private Double ukupnoOstvareno;

    @Column(name = "ostvareno_od_republike")
    private Double ostvarenoOdRepublike;

    @Column(name = "ostvareno_od_ap")
    private Double ostvarenoOdAP;

    @Column(name = "ostvareno_od_grada")
    private Double ostvarenoOdGrada;

    @Column(name = "ostvareno_od_ooso")
    private Double ostvarenoOdOOSO;

    @Column(name = "ostvareno_od_donacija")
    private Double ostvarenoOdDonacija;

    @Column(name = "ostvareno_iz_ostalih_izvora")
    private Double ostvarenoIzOstalihIzvora;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Obrazac5)) return false;
        Obrazac5 obrazac5 = (Obrazac5) o;
        return getOznakaOp().equals(obrazac5.getOznakaOp()) &&
                getKonto().equals(obrazac5.getKonto()) &&
                getOpis().equals(obrazac5.getOpis()) &&
                getPlanirano().equals(obrazac5.getPlanirano()) &&
                getUkupnoOstvareno().equals(obrazac5.getUkupnoOstvareno()) &&
                getOstvarenoOdRepublike().equals(obrazac5.getOstvarenoOdRepublike()) &&
                getOstvarenoOdAP().equals(obrazac5.getOstvarenoOdAP()) &&
                getOstvarenoOdGrada().equals(obrazac5.getOstvarenoOdGrada()) &&
                getOstvarenoOdOOSO().equals(obrazac5.getOstvarenoOdOOSO()) &&
                getOstvarenoOdDonacija().equals(obrazac5.getOstvarenoOdDonacija()) &&
                getOstvarenoIzOstalihIzvora().equals(obrazac5.getOstvarenoIzOstalihIzvora());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getOznakaOp(),
                getKonto(), getOpis(), getPlanirano(),
                getUkupnoOstvareno(), getOstvarenoOdRepublike(),
                getOstvarenoOdAP(), getOstvarenoOdGrada(),
                getOstvarenoOdOOSO(), getOstvarenoOdDonacija(),
                getOstvarenoIzOstalihIzvora());
    }
}
