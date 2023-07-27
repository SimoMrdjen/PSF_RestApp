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
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Component
public class ZakljucniListZbService implements IZakListService {

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
        Sekretarijat sekretarijat = sekretarijarService.getSekretarijat(sifSekret);
        Integer today = (int) LocalDate.now().toEpochDay() + 25569;
        Integer version = checkIfExistValidZListAndFindVersion(jbbks, kvartal);
        //provere
        checkJbbks(user, jbbks);
        checkDuplicatesKonta(dtos);

        var zb =
                ZakljucniListZb.builder()
                        .GEN_OPENTAB(0)
                        .GEN_APVDBK(0)
                        .kojiKvartal(kvartal)
                        .GODINA(year)
                        .verzija(version)
                        .radna(1)
                        .SIF_SEKRET(sifSekret)
                        .RAZDEO(sekretarijat.getRazdeo())
                        .JBBK(sekretarijat.getJED_BROJ_KORISNIKA())
                        .jbbkIndKor(jbbks)
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

    public void checkJbbks(User user, Integer jbbksExcell) {
        var jbbkDb = pPartnerService.getJBBKS(user.getSifra_pp()); //find  in PPARTNER by sifraPP in ind_lozinka

        if (jbbkDb != jbbksExcell) {
            throw new IllegalArgumentException("Niste uneli (odabrali) vaš JBKJS!");
        }
    }
    @Transactional
    @Override
    public Integer checkIfExistValidZListAndFindVersion(Integer jbbks, Integer kvartal) {
        Optional<ZakljucniListZb> zb =
                zakljucniRepository.findFirstByKojiKvartalAndJbbkIndKorOrderByVerzijaDesc(jbbks, kvartal);
        if (zb.isEmpty()) {
            return 1;
        } else {
            if (zb.get().getRadna() == 0 || zb.get().getSTORNO() == 1 ) {
               throw new IllegalArgumentException(
                       "Za tekući kvartal već postoji učitan važeći ZaključniList. " +
                               "Ukoliko ipak želite da učitate ovu verziju, prethodni morate stornirati!");
            }
        }
       return zb.get().getVerzija() + 1;
    }

    public void checkDuplicatesKonta(List<ZakljucniListDto> dtos) {

            List<String>  duplicates = dtos.stream()
                .collect(Collectors.groupingBy(ZakljucniListDto::getProp1, Collectors.counting()))
                    .entrySet()
                    .stream()
                    .filter(e -> e.getValue() > 1)
                    .map(e -> e.getKey())
                    .collect(Collectors.toList());

        if (!duplicates.isEmpty()) {
            throw new IllegalArgumentException("Imate duplirana konta: " + duplicates );
        }
    }

}
