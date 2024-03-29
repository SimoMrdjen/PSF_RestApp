package psf.ucitavanje.obrazaca.obrazac5.obrazacZb;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import psf.ucitavanje.obrazaca.obrazac5.Obrazac5DTO;
import psf.ucitavanje.obrazaca.obrazac5.obrazac.ObrazacService;
import psf.ucitavanje.obrazaca.obrazac5.ppartner.PPartnerService;
import psf.ucitavanje.obrazaca.obrazac5.sekretarijat.SekretarijarService;
import psf.ucitavanje.obrazaca.obrazac5.sekretarijat.Sekretarijat;
import psf.ucitavanje.obrazaca.security.user.UserRepository;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
@Component
public class ObrazacZbService {
    private final ObrazacZbRepository obrazacZbRepository;
    private final SekretarijarService sekretarijarService;
    private final ObrazacService obrazacService;
    private final PPartnerService pPartnerService;
    private final UserRepository userRepository;

    @Transactional
    public ObrazacZb saveObrazac5(List<Obrazac5DTO> dtos, Integer kvartal, String email) throws Exception {
        Object object = new Object();

        var user = userRepository.findByEmail(email).orElseThrow();

        Integer sifSekret = user.getZa_sif_sekret(); //fetch from table user-bice- user.getZa_sif_sekret();
        Sekretarijat sekretarijat = sekretarijarService.getSekretarijat(sifSekret); //fetch from table user or sekr, im not sure

        Integer jbbk = pPartnerService.getJBBKS(user.getSifra_pp()); //find  in PPARTNER by sifraPP in ind_lozinka ind_lozinkaService.getJbbk

        Integer today = (int) LocalDate.now().toEpochDay() + 25569;

        //necessary to add checking methods-Zakljucni is example
        Integer version = findVersion(jbbk, kvartal);

        ObrazacZb zb = ObrazacZb.builder()
                //.gen_interbase(1)
                .koji_kvartal(kvartal)
                .tip_obrazca(5)
                .sif_sekret(sifSekret)
                .razdeo(sekretarijat.getRazdeo())
                .sif_rac(1)
                .verzija(version)
                .dinarski(1)
                .status(0)
                .poslato_o(0)
                .radna(1)
                .povuceno(0)
                .konacno(0)
                .poslao_nam(user.getSifraradnika())
                .poslao_u_org(0)
                .poslao_iz_org(0)
                .zaprimio_ver(0)
                .overio_ver(0)
                .odobrio_ver(0)
                .proknjizeno(0)
                .jbbk_ind_kor(jbbk)
                .storno(0)
                .stosifrad(0)
                .opisstorno("_")
                .podigao_status(0)
                .datum_pod_statusa(0)
                .datum_org(0)
                .nivo_konsolidacije(0)
                .build();

        ObrazacZb zbSaved = obrazacZbRepository.save(zb);

        obrazacService.saveListObrazac(dtos, zbSaved);

        return zbSaved;
    }

    @Transactional
    public Integer findVersion(Integer jbbks, Integer kvartal) {
        Integer version = obrazacZbRepository.getLastVersionValue(jbbks, kvartal).orElse(0);
        return version + 1;
    }

}
