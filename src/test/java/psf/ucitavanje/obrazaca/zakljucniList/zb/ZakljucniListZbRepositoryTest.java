package psf.ucitavanje.obrazaca.zakljucniList.zb;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
public class ZakljucniListZbRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ZakljucniListZbRepository zakljucniListZbRepository;

    @Test
    public void testFindFirstByKojiKvartalAndJbbkIndKorOrderByVerzijaDesc() {
        // Given
        ZakljucniListZb zakljucniListZb1 = createZakljucniListZb(2, 1, 1);
        entityManager.persistAndFlush(zakljucniListZb1);

        ZakljucniListZb zakljucniListZb2 = createZakljucniListZb(1, 1, 2);
        entityManager.persistAndFlush(zakljucniListZb2);

        // When
        Optional<ZakljucniListZb> result = zakljucniListZbRepository.findFirstByKojiKvartalAndJbbkIndKorOrderByVerzijaDesc(1, 1);

        // Then
        assertTrue(result.isPresent());
        assertEquals(zakljucniListZb2, result.get());
    }

    private ZakljucniListZb createZakljucniListZb(Integer kojiKvartal, Integer jbbkIndKor, Integer verzija) {
        ZakljucniListZb zakljucniListZb = new ZakljucniListZb();
        zakljucniListZb.setKojiKvartal(kojiKvartal);
        zakljucniListZb.setJbbkIndKor(jbbkIndKor);
        zakljucniListZb.setVerzija(verzija);
        // Set values for other non-nullable fields here
        // For example:
        zakljucniListZb.setGEN_INTERBASE(0);
        zakljucniListZb.setGEN_OPENTAB(0);
        zakljucniListZb.setGEN_APVDBK(0);
        zakljucniListZb.setGODINA(2023);
        zakljucniListZb.setRadna(1);
        zakljucniListZb.setSIF_SEKRET(1);
        zakljucniListZb.setRAZDEO(1);
        zakljucniListZb.setJBBK(1);
        zakljucniListZb.setDATUM_DOK(1);
        // Continue for all non-nullable fields
        return zakljucniListZb;
    }
}

