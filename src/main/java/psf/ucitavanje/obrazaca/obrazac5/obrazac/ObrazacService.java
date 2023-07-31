package psf.ucitavanje.obrazaca.obrazac5.obrazac;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import psf.ucitavanje.obrazaca.obrazac5.Obrazac5DTO;
import psf.ucitavanje.obrazaca.obrazac5.obrazacZb.ObrazacZb;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Component
public class ObrazacService {

    private final ObrazacRepository obrazacRepository;
    private final ObrazacMapper obrazacMapper;

    @Transactional
    public List<Obrazac> saveListObrazac(List<Obrazac5DTO> dtos, ObrazacZb zb) {
        List<Obrazac> obrazacList =
                dtos.stream()
                        .filter(dto -> dto.getProp2() % 1000 != 0)
                        .map(obrazacMapper::mapDtoToEntity)
                        .collect(Collectors.toList());

        obrazacList
                .forEach(obrazac -> {
                    obrazac.setGen_mysql(zb.getGen_mysql());
                    obrazac.setVerzija(zb.getVerzija());
                    obrazac.setKoji_kvartal(zb.getKoji_kvartal());
                    obrazac.setSif_sekret(zb.getSif_sekret());
                    obrazac.setRazdeo(zb.getRazdeo());
                    obrazac.setJbbk_ind_kor(zb.getJbbk_ind_kor());
                });
        return obrazacRepository.saveAll(obrazacList);
    }
}
