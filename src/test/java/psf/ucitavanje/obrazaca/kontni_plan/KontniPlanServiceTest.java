package psf.ucitavanje.obrazaca.kontni_plan;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class KontniPlanServiceTest {

    private KontniPlanService service;
    @Mock
    private KontniPlanRepository repository;
    private List<KontniPlan> kontos;

    @BeforeEach
    void setUp() {
        repository = mock(KontniPlanRepository.class);
        service = new KontniPlanService(repository);

        KontniPlan kontniPlan1 = new KontniPlan();
        kontniPlan1.setSubKonto(1001);
        kontniPlan1.setKlasa(1);
        kontniPlan1.setKategorija(10);
        kontniPlan1.setSifGrupe(101);
        kontniPlan1.setSinKonto(100);
        kontniPlan1.setKonto5(10001);
        kontniPlan1.setDNazivSubKonto("Subkonto 1");

        KontniPlan kontniPlan2 = new KontniPlan();
        kontniPlan2.setSubKonto(2002);
        kontniPlan2.setKlasa(2);
        kontniPlan2.setKategorija(20);
        kontniPlan2.setSifGrupe(202);
        kontniPlan2.setSinKonto(200);
        kontniPlan2.setKonto5(20002);
        kontniPlan2.setDNazivSubKonto("Subkonto 2");
        
        kontos = List.of(kontniPlan1, kontniPlan2);

    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void getKontniPlan() {
        when(repository.findAll()).thenReturn(kontos);

        assertEquals(service.getKontniPlan(),List.of(1001,2002));


    }
}