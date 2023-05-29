package psf.ucitavanje.obrazaca.obrazac5;

import org.springframework.stereotype.Component;

@Component
public class ObrazacMapper {
    public Obrazac mapDtoToEntity(Obrazac5DTO dto) {
        return Obrazac.builder()
                .oznakaop(dto.getProp1())
                .konto(dto.getProp2())
                .opis(dto.getProp3())
                .planprihoda(dto.getProp4())
                .republika(dto.getProp6())
                .pokrajina(dto.getProp7())
                .opstina(dto.getProp8())
                .ooso(dto.getProp9())
                .donacije(dto.getProp10())
                .ostali(dto.getProp11())
                .godplan(dto.getProp4())
                .izvrsenje(dto.getProp5())
                .build();
    }
}
