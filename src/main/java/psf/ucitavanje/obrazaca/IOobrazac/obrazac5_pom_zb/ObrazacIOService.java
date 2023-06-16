package psf.ucitavanje.obrazaca.IOobrazac.obrazac5_pom_zb;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import psf.ucitavanje.obrazaca.IOobrazac.ObrazacIODTO;
import psf.ucitavanje.obrazaca.IOobrazac.obrazac5_pom.ObrazacIODetailService;
import psf.ucitavanje.obrazaca.obrazac5.obrazacZb.ObrazacZb;
import psf.ucitavanje.obrazaca.obrazac5.ppartner.PPartnerService;
import psf.ucitavanje.obrazaca.obrazac5.sekretarijat.SekretarijarService;

import java.time.LocalDate;
import java.util.List;

@RequiredArgsConstructor
@Service
@Component
public class ObrazacIOService {
    private final ObrazacIORepository obrazacIOrepository;
    private final SekretarijarService sekretarijarService;
    private final PPartnerService pPartnerService;
    private final ObrazacIODetailService obrazacIODetailService;

    public Obrazac5_pom_zb saveObrazacIO(List<ObrazacIODTO> dtos, Integer kvartal) {
        Integer sifSekret = 30; //fetch from table user
        Integer razdeo  = sekretarijarService.getRazdeo(sifSekret); //fetch from table user or sekr, im not sure
        Integer radnik = 50001;//sifra usera
        Integer jbbk = pPartnerService.getJBBKS(radnik); //find  in PPARTNER by sifraPP in ind_lozinka ind_lozinkaService.getJbbk
        Integer today = (int) LocalDate.now().toEpochDay() + 25569;
        Integer version = findVersion(jbbk, kvartal);
        Integer todayInt = (int) LocalDate.now().toEpochDay() + 25569;

        Obrazac5_pom_zb obrIO = Obrazac5_pom_zb.builder()
                .KOJI_KVARTAL(kvartal)
                .GODINA(2023)
                .VERZIJA(version)
                .RADNA(1)
                .SIF_SEKRET(sifSekret)
                .RAZDEO(razdeo)
                .JBBK(1)
                .JBBK_IND_KOR(jbbk)
                .SIF_RAC(1)
                .DINARSKI(1)
                .STATUS(0)
                .POSLATO_O(0)
                .POVUCENO(0)
                .KONACNO(0)
                .POSLAO_NAM(0)
                .DATUM_DOK(todayInt)
                .PROKNJIZENO(0)
                .XLS(0)
                .STORNO(0)
                .STOSIFRAD(0)
                .GEN_OPENTAB(0)
                .build();
        Obrazac5_pom_zb obrIOSaved = obrazacIOrepository.save(obrIO);

        obrazacIODetailService.saveListOfObrazac5_pom(dtos, obrIOSaved);
        return obrIOSaved;
    }

    private Integer findVersion(Integer jbbk, Integer kvartal) {
        Integer version = obrazacIOrepository.getLastVersionValue(jbbk, kvartal).orElse(0);
        return version + 1;
    }
}
