package psf.ucitavanje.obrazaca.zakljucniList.zb;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import psf.ucitavanje.obrazaca.obrazac5.obrazacZb.ObrazacZbRepository;
import psf.ucitavanje.obrazaca.obrazac5.ppartner.PPartnerService;
import psf.ucitavanje.obrazaca.obrazac5.sekretarijat.SekretarijarService;
import psf.ucitavanje.obrazaca.obrazac5.sekretarijat.Sekretarijat;
import psf.ucitavanje.obrazaca.security.user.User;
import psf.ucitavanje.obrazaca.security.user.UserRepository;
import psf.ucitavanje.obrazaca.zakljucniList.ZakljucniListDto;
import psf.ucitavanje.obrazaca.zakljucniList.details.ZakljucniDetailsService;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Component
public class ZakljucniListZbService {

    private final ZakljucniListZbRepository zakljucniRepository;
    private final SekretarijarService sekretarijarService;
    private final PPartnerService pPartnerService;
    private final UserRepository userRepository;
    private final ObrazacZbRepository obrazacZbRepository;
    private final ZakljucniDetailsService zakljucniDetailsService;

    @Transactional
    public ZakljucniListZb saveZakljucniList(List<ZakljucniListDto> dtos,
                                             Integer kvartal,
                                             Integer jbbks,
                                             Integer year,
                                             String email) {

        User user = userRepository.findByEmail(email).orElseThrow();
        Integer sifSekret = user.getZa_sif_sekret(); //fetch from table user-bice- user.getZa_sif_sekret();
        Sekretarijat sekretarijat = sekretarijarService.getSekretarijat(sifSekret); //fetch from table user or sekr, im not sure
        // ind_lozinkaService.getJbbk
        Integer today = (int) LocalDate.now().toEpochDay() + 25569;
        Integer version = findVersion(jbbks, kvartal);

        //provere
        checkJbbks(user, jbbks);


        var zb =
                ZakljucniListZb.builder()
                        .GEN_OPENTAB(0)
                        .GEN_APVDBK(0)
                        .KOJI_KVARTAL(kvartal)
                        .GODINA(year)
                        .VERZIJA(version)
                        .RADNA(1)
                        .SIF_SEKRET(sifSekret)
                        .RAZDEO(sekretarijat.getRazdeo())
                        .JBBK(sekretarijat.getJED_BROJ_KORISNIKA())
                        .JBBK_IND_KOR(jbbks)
                        .SIF_RAC(1)
                        .DINARSKI(1)
                        .STATUS(0)
                        .POSLATO_O(0)
                        .POVUCENO(0)
                        .KONACNO(0)
                        .POSLAO_NAM(user.getSifraradnika())
                        .DATUM_DOK(today)
                        .PROKNJIZENO(0)
                        .XLS(0)
                        .STORNO(0)
                        .STOSIFRAD(0)
                        .build();
        var zbSaved = zakljucniRepository.save(zb);

        zakljucniDetailsService.saveDetails(dtos, zbSaved);
        return zbSaved;
    }

    @Transactional
    public Integer findVersion(Integer jbbks, Integer kvartal) {
        Integer version = obrazacZbRepository.getLastVersionValue(jbbks, kvartal).orElse(0);
        return version + 1;
    }

    private void checkJbbks(User user, Integer jbbksExcell) {
        var jbbkDb = pPartnerService.getJBBKS(user.getSifra_pp()); //find  in PPARTNER by sifraPP in ind_lozinka

        if (jbbkDb != jbbksExcell) {
            throw new IllegalArgumentException("Niste uneli (odabrali) vaš JBKJS!");
        }
    }

    private void checkDuplicatesKonta(List<ZakljucniListDto> dtos) {
        List<String> duplicates = dtos.stream()
              .filter(dto -> dtos.stream()
                      .filter(dto2 -> dto2.getProp1().equals(dto.getProp1()))
                      .count() > 1)
                .map(dto -> dto.getProp1())
              .collect(Collectors.toList());

        if (!duplicates.isEmpty()) {
            throw new IllegalArgumentException("Imate duplirana konta: " + duplicates);
        }
    }

}
