package psf.ucitavanje.obrazaca.subkonto;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class SubkontoServiceTest {

    private SubkontoService service;
    @Mock
    private SubkontoRepository repository;
    private List<Subkonto> kontos;

    @BeforeEach
    void setUp() {
        repository = mock(SubkontoRepository.class);
        service = new SubkontoService(repository);

        Subkonto subkonto1 = new Subkonto();
        subkonto1.setSubKonto(1001);
        Subkonto subkonto2 = new Subkonto();
        subkonto2.setSubKonto(2002);
        kontos = List.of(subkonto1, subkonto2);

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