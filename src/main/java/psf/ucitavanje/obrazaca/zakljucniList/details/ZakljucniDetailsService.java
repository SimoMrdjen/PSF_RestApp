package psf.ucitavanje.obrazaca.zakljucniList.details;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import psf.ucitavanje.obrazaca.glavaSvi.GlavaSvi;
import psf.ucitavanje.obrazaca.glavaSvi.GlavaSviRepository;
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

    @Transactional
    public List<ZakljucniListDetails> saveDetails(List<ZakljucniListDto> dtos, ZakljucniListZb zbSaved) {
        var jbbk = zbSaved.getJbbkIndKor();
        String oznakaGlave;

        Optional<GlavaSvi> glavaSvi = glaviSviRepository.findByJedBrojKorisnika(jbbk);
        if(glavaSvi.isPresent()){
            oznakaGlave = glavaSvi.get().getOznaka();
        }else{
            oznakaGlave = "00";}


        List<ZakljucniListDetails> details = dtos.stream()
                .map(d -> mapper.mapDtoToEntity(d, zbSaved, oznakaGlave))
                .collect(Collectors.toList());

        return zakljucniDetailsRepository.saveAll(details);


    }
}
