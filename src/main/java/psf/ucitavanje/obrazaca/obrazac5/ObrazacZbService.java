package psf.ucitavanje.obrazaca.obrazac5;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Component
public class ObrazacZbService {

    private final ObrazacZbRepository obrazacZbRepository;
    private final ObrazacZbMapper obrazacZbMapper;
    private  final ObrazacMapper obrazacMapper;
    private final ObrazacRepository obrazacRepository;

    public ObrazacZb saveObrazac5(List<Obrazac5DTO> dtos) {
        Object object = new Object();

        Integer verzija = 1; //fetch verzija
        Integer kojiKvartal = 1; //take from request
        Integer sifSekret = 99; //fetch from table user
        Integer razdeo  = 25; //fetch from table user or sekr, im not sure
        Integer JbbkIndKor = 999; //fetch , same as razdeo
        ObrazacZb zb = obrazacZbMapper.mapDtoToEntity(object);
        ObrazacZb zbSaved = obrazacZbRepository.save(zb);
        Integer genMySql = zbSaved.getGen_mysql();
        List<Obrazac> obrazacList =
                dtos.stream()
                .filter(dto -> dto.getProp2() % 100 != 0)
                .map(obrazacMapper::mapDtoToEntity)
                .collect(Collectors.toList());

        obrazacList
                .forEach(obrazac -> {
                    obrazac.setGen_mysql(genMySql);
                    obrazac.setVerzija(verzija);
                    obrazac.setKoji_kvartal(kojiKvartal);
                    obrazac.setSif_sekret(sifSekret);
                    obrazac.setRazdeo(razdeo);
                    obrazac.setJbbk_ind_kor(JbbkIndKor);
                });
        obrazacRepository.saveAll(obrazacList);
        return zbSaved;
    }

}
