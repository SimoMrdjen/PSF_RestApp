package psf.ucitavanje.obrazaca.zakljucniList.details;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import psf.ucitavanje.obrazaca.zakljucniList.ZakljucniListDto;
import psf.ucitavanje.obrazaca.zakljucniList.zb.ZakljucniListZb;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ZakljucniDetailsService {

    private final ZakljucniListMapper mapper;
    private final ZakljucniDetailsRepository zakljucniDetailsRepository;
    @Transactional
    public List<ZakljucniListDetails> saveDetails(List<ZakljucniListDto> dtos, ZakljucniListZb zbSaved) {
        List<ZakljucniListDetails> details = dtos.stream()
                .map(d -> mapper.mapDtoToEntity(d,zbSaved))
                .collect(Collectors.toList());

        return zakljucniDetailsRepository.saveAll(details);


    }
}
