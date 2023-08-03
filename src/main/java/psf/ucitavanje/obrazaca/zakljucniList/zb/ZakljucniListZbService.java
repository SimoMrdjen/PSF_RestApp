package psf.ucitavanje.obrazaca.zakljucniList.zb;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import psf.ucitavanje.obrazaca.kontrole.obrazac.ObrKontrService;
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
    private StringBuilder responseMessage =  new StringBuilder();
    private final ObrKontrService obrKontrService;

    @Transactional
    public StringBuilder saveZakljucniList(List<ZakljucniListDto> dtos,
                                           Integer kvartal,
                                           Integer jbbks,
                                           Integer year,
                                           String email) throws Exception {

        responseMessage.delete(0, responseMessage.length());
        User user = userRepository.findByEmail(email).orElseThrow();
        Integer sifSekret = user.getZa_sif_sekret();
        Sekretarijat sekretarijat = sekretarijarService.getSekretarijat(sifSekret);
        Integer today = (int) LocalDate.now().toEpochDay() + 25569;
        //provere
        Integer version = checkIfExistValidZListAndFindVersion(kvartal, jbbks);
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
        return responseMessage;
    }

    public void checkJbbks(User user, Integer jbbksExcell) throws Exception {
        var jbbkDb = pPartnerService.getJBBKS(user.getSifra_pp()); //find  in PPARTNER by sifraPP in ind_lozinka

        if (!jbbkDb.equals(jbbksExcell)) {
            throw new Exception("Niste uneli (odabrali) vaš JBKJS!");
        }
    }
    @Transactional
    @Override
    public Integer checkIfExistValidZListAndFindVersion(Integer kvartal, Integer jbbks ) throws Exception {
        Optional<ZakljucniListZb> zb =
                zakljucniRepository.findFirstByKojiKvartalAndJbbkIndKorOrderByVerzijaDesc( kvartal, jbbks);
        if (zb.isEmpty()) {
            return 1;
        } else {
            if (zb.get().getRadna() == 1 || zb.get().getSTORNO() == 0 ) {
               throw new Exception(
                       "Za tekući kvartal već postoji učitan važeći \nZaključniList. " +
                               "Ukoliko ipak želite da \nučitate ovu verziju, prethodni morate \nstornirati!");
            }
        }
       return zb.get().getVerzija() + 1;
    }

    public void checkDuplicatesKonta(List<ZakljucniListDto> dtos) throws Exception {

            var validError = obrKontrService.isKontrolaMandatory(9);
            List<String>  duplicates = dtos.stream()
                .collect(Collectors.groupingBy(ZakljucniListDto::getProp1, Collectors.counting()))
                    .entrySet()
                    .stream()
                    .filter(e -> e.getValue() > 1)
                    .map(e -> e.getKey())
                    .collect(Collectors.toList());

        if (!duplicates.isEmpty() && validError) {
            throw new Exception("Imate duplirana konta: " + duplicates );
        }else if(!duplicates.isEmpty() && !validError) {
            responseMessage.append( "Imate duplirana konta: " + duplicates) ;
            //responseMessage.append("Imate duplirana konta: " + duplicates );
        }
    }

}
