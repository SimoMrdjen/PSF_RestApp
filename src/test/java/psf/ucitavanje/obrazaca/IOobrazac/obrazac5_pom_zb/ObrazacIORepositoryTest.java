package psf.ucitavanje.obrazaca.IOobrazac.obrazac5_pom_zb;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import java.util.Optional;

//@DataJpaTest
public class ObrazacIORepositoryTest {

//    @Autowired
//    private ObrazacIORepository obrazacIORepository;
//
//    @Autowired
//    private TestEntityManager entityManager;

    @Test
    @Disabled
    //@Sql("/data.sql") // Optional: Use if you want to load test data from an SQL file
    public void testGetLastVersionValue() {

//        Obrazac5_pom_zb obrIO = Obrazac5_pom_zb.builder()
//                .KOJI_KVARTAL(1)
//                .GODINA(2023)
//                .VERZIJA(2)
//                .RADNA(1)
//                .SIF_SEKRET(1)
//                .RAZDEO(30)
//                .JBBK(1)
//                .JBBK_IND_KOR(123)
//                .SIF_RAC(1)
//                .DINARSKI(1)
//                .STATUS(0)
//                .POSLATO_O(0)
//                .POVUCENO(0)
//                .KONACNO(0)
//                .POSLAO_NAM(1)
//                .DATUM_DOK(40)
//                .PROKNJIZENO(0)
//                .XLS(0)
//                .STORNO(0)
//                .STOSIFRAD(0)
//                .GEN_OPENTAB(0)
//                .build();
//        obrazacIORepository.save(obrIO);
//        Integer jbbk = 123;
//        Integer kvartal = 1;
//
//        Integer expectedVersion = 2;
//
//        Optional<Integer> actualVersion = obrazacIORepository.getLastVersionValue(jbbk, kvartal);
//
//        Assertions.assertTrue(actualVersion.isPresent());
//        Assertions.assertEquals(expectedVersion, actualVersion.get());
    }
}
