package psf.ucitavanje.obrazaca.obrazac5.obrazac5_old;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import psf.ucitavanje.obrazaca.obrazac5.Obrazac5DTO;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Component
public class Obr5Service implements IObr5Service {

    private final Obrazac5Mapper mapper;
    private final Obr5Repository repository;
    @Override
    public List<Obrazac5DTO> saveAll(List<Obrazac5DTO> dtos) {
        List<Obrazac5> entities =
                dtos
                        .stream()
                        .map(mapper::mapDtoToEntity)
                        .collect(Collectors.toList());

        return repository
                .saveAll(entities)
                .stream()
                .map(mapper::mapEntityToDto)
                .collect(Collectors.toList());
    }
}
