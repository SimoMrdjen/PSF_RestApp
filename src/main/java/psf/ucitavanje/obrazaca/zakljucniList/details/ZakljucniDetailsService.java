package psf.ucitavanje.obrazaca.zakljucniList.details;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import psf.ucitavanje.obrazaca.glavaSvi.GlavaSvi;
import psf.ucitavanje.obrazaca.glavaSvi.GlavaSviRepository;
import psf.ucitavanje.obrazaca.subkonto.SubkontoService;
import psf.ucitavanje.obrazaca.zakljucniList.ZakljucniListDto;
import psf.ucitavanje.obrazaca.zakljucniList.zb.ZakljucniListZb;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ZakljucniDetailsService {

    private final ZakljucniListMapper mapper;
    private final ZakljucniDetailsRepository zakljucniDetailsRepository;
    private final GlavaSviRepository glaviSviRepository;
    private final SubkontoService subkontoService;

    @Transactional
    public List<ZakljucniListDetails> saveDetails(List<ZakljucniListDto> dtos, ZakljucniListZb zbSaved) throws Exception {
        //provera da li su ucitani samo postojeci 6-cifreni kontoi
        this.checkIfKontosAreExisting(dtos);

        var jbbk = zbSaved.getJbbkIndKor();
        String oznakaGlave;

        Optional<GlavaSvi> glavaSvi = glaviSviRepository.findByJedBrojKorisnikaAndAktivan(jbbk, 1);
        if(glavaSvi.isPresent()){
            oznakaGlave = glavaSvi.get().getOznaka();
        }else{
            oznakaGlave = "00";}

        List<ZakljucniListDetails> details = dtos.stream()
                .map(d -> mapper.mapDtoToEntity(d, zbSaved, oznakaGlave))
                .collect(Collectors.toList());

        return zakljucniDetailsRepository.saveAll(details);
    }

    public void checkIfKontosAreExisting(List<ZakljucniListDto> dtos) throws Exception {

        List<Integer> kontosInKontniPlan = subkontoService.getKontniPlan();

        List<Integer> nonExistingKontos = dtos.stream()
                .map(ZakljucniListDto::getProp1)
                .map(kon -> kon.trim())
                .map(Integer::parseInt)
                .filter((k) -> !kontosInKontniPlan.contains(k))
                .collect(Collectors.toList());

        List<String> nonExistingKontosString =  nonExistingKontos.stream()
                .map(konto -> Integer.toString(konto))
                .map(konto -> konto.length() < 6 ? ("0" + konto) : konto)
                .collect(Collectors.toList());

        if (!nonExistingKontos.isEmpty()) {
            throw new Exception("U Zakljucnom listu postoje konta koja nisu \ndeo Kontnog plana: " + nonExistingKontosString);
        }
    }
}
