package psf.ucitavanje.obrazaca.zakljucniList.details;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import psf.ucitavanje.obrazaca.glavaSvi.GlavaSviRepository;
import psf.ucitavanje.obrazaca.kontni_plan.KontniPlanRepository;
import psf.ucitavanje.obrazaca.kontni_plan.KontniPlanService;
import psf.ucitavanje.obrazaca.zakljucniList.ZakljucniListDto;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ZakljucniDetailsServiceTest {

    @Mock
    private KontniPlanService kontniPlanService;
    @Mock
    private  ZakljucniListMapper mapper;
    @Mock
    private  ZakljucniDetailsRepository zakljucniDetailsRepository;
    @Mock
    private  GlavaSviRepository glaviSviRepository;
    private ZakljucniDetailsService service;

    @BeforeEach
    void setUp() {
        kontniPlanService = mock(KontniPlanService.class);
        mapper = mock(ZakljucniListMapper.class);
        zakljucniDetailsRepository = mock(ZakljucniDetailsRepository.class);
        glaviSviRepository = mock(GlavaSviRepository.class);
        service = new ZakljucniDetailsService(mapper,  zakljucniDetailsRepository, glaviSviRepository,kontniPlanService);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void saveDetails() {
    }

    @Test
    void shouldThrowIfCheckIfKontosAreExistingNotValid() {
        ZakljucniListDto obj1 = new ZakljucniListDto();
        obj1.setProp1("1");
        obj1.setProp2(10.5);
        obj1.setProp3(20.0);
        obj1.setProp4(30.0);
        obj1.setProp5(40.0);
        obj1.setProp6(50.0);
        obj1.setProp7(60.0);
        obj1.setProp8(70.0);

        ZakljucniListDto obj2 = new ZakljucniListDto();
        obj2.setProp1("4");
        obj2.setProp2(11.0);
        obj2.setProp3(22.0);
        obj2.setProp4(33.0);
        obj2.setProp5(44.0);
        obj2.setProp6(55.0);
        obj2.setProp7(66.0);
        obj2.setProp8(77.0);
        var dtos = List.of(obj1, obj2);

        when(kontniPlanService.getKontniPlan()).thenReturn(List.of(1,2,3));
        assertThrows(Exception.class,
                () -> service.checkIfKontosAreExisting(dtos), "U Zakljucnom list postoje konta koja nisu deo Kontnog " +
                        "plana: 4");
    }
}