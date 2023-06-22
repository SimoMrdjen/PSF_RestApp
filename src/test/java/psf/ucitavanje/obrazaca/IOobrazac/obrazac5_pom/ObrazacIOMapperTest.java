package psf.ucitavanje.obrazaca.IOobrazac.obrazac5_pom;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import psf.ucitavanje.obrazaca.IOobrazac.ObrazacIODTO;

public class ObrazacIOMapperTest {

    @Test
    public void testMapDtoToEntity() {
        ObrazacIODTO obrazacIODTO = new ObrazacIODTO();
        obrazacIODTO.setProp1(1);
        obrazacIODTO.setProp2("FUNK_KLAS");
        obrazacIODTO.setProp3(500000);
        obrazacIODTO.setProp4("IZVORFIN");
        obrazacIODTO.setProp5("IZVORFIN_PRE");
        obrazacIODTO.setProp6(100.0);
        obrazacIODTO.setProp7(200.0);

        Obrazac5_pom expectedEntity = Obrazac5_pom.builder()
                .RED_BROJ_AKT(1)
                .FUNK_KLAS("FUNK_KLAS")
                .SIN_KONTO(5000)
                .KONTO(500000)
                .IZVORFIN("IZVORFIN")
                .IZVORFIN_PRE("IZVORFIN_PRE")
                .ALINEA(0)
                .DUGG(100.0)
                .POTG(0.0)
                .DUGUJE(200.0)
                .POTRAZUJE(0.0)
                .REPUBLIKA(0.0)
                .POKRAJINA(0.0)
                .OPSTINA(0.0)
                .OOSO(0.0)
                .DONACIJE(0.0)
                .OSTALI(0.0)
                .UPARENO(0)
                .build();

        ObrazacIOMapper mapper = new ObrazacIOMapper();
        Obrazac5_pom actualEntity = mapper.mapDtoToEntity(obrazacIODTO);

        Assertions.assertEquals(expectedEntity, actualEntity);
    }
}
