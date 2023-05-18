package psf.ucitavanje.obrazaca.obrazac5;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Component
public class Obr5Service implements IObr5Service{

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
