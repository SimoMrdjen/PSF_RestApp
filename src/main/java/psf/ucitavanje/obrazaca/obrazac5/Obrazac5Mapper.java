package psf.ucitavanje.obrazaca.obrazac5;

import org.springframework.stereotype.Component;

@Component
public class Obrazac5Mapper {
    public  Obrazac5 mapDtoToEntity(Obrazac5DTO dto) {
        return new Obrazac5(
                null,
                dto.getProp1(),
                dto.getProp2(),
                dto.getProp3(),
                dto.getProp4(),
                dto.getProp5(),
                dto.getProp6(),
                dto.getProp7(),
                dto.getProp8(),
                dto.getProp9(),
                dto.getProp10(),
                dto.getProp11()
                );
    }
}
