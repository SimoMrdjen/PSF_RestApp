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

    @Column(name = "oznaka_op",unique = true, nullable = false)
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


}
