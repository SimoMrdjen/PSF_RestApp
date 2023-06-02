package psf.ucitavanje.obrazaca.obrazac5.obrazacZb;

import org.springframework.stereotype.Component;
import psf.ucitavanje.obrazaca.obrazac5.obrazacZb.ObrazacZb;

@Component
public class ObrazacZbMapper {
    public ObrazacZb mapDtoToEntity(Integer kvartal) {
        return new ObrazacZb(
                    null,
                1,
                kvartal,
                5,
                19,
                19,
                1,
                5,
                1,
                10,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                55555,
                0,
                0,
                "aaaaa",
                0,
                1,
                11,
                0

        );
    }

}
