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

    private Integer getJbbksIBK(String email) {
        User user = userRepository.findByEmail(email).orElseThrow();
        return pPartnerService.getJBBKS(user.getSifra_pp());
    }

    public void checkJbbks(User user, Integer jbbksExcell) throws Exception {
        var jbbkDb =getJbbksIBK(user.getEmail()); //find  in PPARTNER by sifraPP in ind_lozinka

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
            if ((zb.get().getRadna() == 1 || zb.get().getSTORNO() == 0) && (zb.get().getSTATUS() >= 20)) {
               throw new Exception(
                       "Za tekući kvartal već postoji učitan važeći \nZaključniList poslat Vašem DBK-u! " );
            }
        }
       return zb.get().getVerzija() + 1;
    }

    public ZaKListResponse getLastValidVersionZList(String email) throws Exception {

        var jbbks = getJbbksIBK(email);
        Optional<ZakljucniListZb> zb =
                zakljucniRepository.findFirstByJbbkIndKorOrderByGenMysqlDesc(jbbks);

        if(zb.isEmpty()|| zb.get().getSTORNO() == 1 ) {
            throw new IllegalArgumentException("Ne postoji vazeci ucitan Zakljucni list");
        }
        if(zb.get().getSTATUS() >= 20) {
            throw new Exception("Važeća verzija učitanog \n" +
                    "Zaključnog lista poslata je Vašem DBK-u!");
        }
        LocalDate date = LocalDate.ofEpochDay(zb.get().getDATUM_DOK() - 25569);
        return ZaKListResponse.builder()
                .id(zb.get().getGenMysql())
                .date(date)
                .kvartal(zb.get().getKojiKvartal())
                .year(zb.get().getGODINA())
                .version(zb.get().getVerzija())
                .status(zb.get().getSTATUS())
                .jbbk(zb.get().getJBBK())
                .build();
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
        }
    }

    @Transactional
    public String raiseStatus(Integer id, String email) throws Exception {
        User user = userRepository.findByEmail(email).orElseThrow();

        var zb = zakljucniRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Zakljucni lis ne postoji!"));

        if (zb.getSTATUS() >= 20 || zb.getSTORNO() == 1) {
            throw new Exception("Zakljucni list ima status veci od 10 \n" +
                    "ili je vec storniran");
        }
            var raisedStatus = zb.getSTATUS() + 10;
            zb.setSTATUS(raisedStatus);
            zb.setPODIGAO_STATUS(user.getSifraradnika());
            zakljucniRepository.save(zb);
            return "Zakljucnom listu je status \npodignut na nivo " +
                    raisedStatus + "!";
    }

    @Transactional
    public String stornoZakList(Integer id, String email) throws Exception {
        User user = userRepository.findByEmail(email).orElseThrow();
        var zb = zakljucniRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Zakljucni list ne postoji!"));

        if (zb.getSTATUS() >= 20 || zb.getSTORNO() == 1) {
            throw new Exception("Zakljucni list ima status veci od 10 \n" +
                    "ili je vec storniran");
        }
        zb.setSTORNO(1);
        zb.setSTOSIFRAD(user.getSifraradnika());
        zakljucniRepository.save(zb);
        return "Zakljucni list je storniran!";
    }
}
