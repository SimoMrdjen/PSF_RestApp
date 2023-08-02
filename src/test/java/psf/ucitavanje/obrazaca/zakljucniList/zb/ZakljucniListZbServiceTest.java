package psf.ucitavanje.obrazaca.zakljucniList.zb;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import psf.ucitavanje.obrazaca.obrazac5.obrazacZb.ObrazacZbRepository;
import psf.ucitavanje.obrazaca.obrazac5.ppartner.PPartnerService;
import psf.ucitavanje.obrazaca.obrazac5.sekretarijat.SekretarijarService;
import psf.ucitavanje.obrazaca.obrazac5.sekretarijat.Sekretarijat;
import psf.ucitavanje.obrazaca.security.user.User;
import psf.ucitavanje.obrazaca.security.user.UserRepository;
import psf.ucitavanje.obrazaca.zakljucniList.ZakljucniListDto;
import psf.ucitavanje.obrazaca.zakljucniList.details.ZakljucniDetailsService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class ZakljucniListZbServiceTest {

    @Mock
    private ZakljucniListZbRepository zakljucniRepository;

    @Mock
    private SekretarijarService sekretarijarService;

    @Mock
    private PPartnerService pPartnerService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ObrazacZbRepository obrazacZbRepository;

    @Mock
    private ZakljucniDetailsService zakljucniDetailsService;

    @InjectMocks
    private ZakljucniListZbService zakljucniListZbService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @Disabled
    public void testSaveZakljucniList() throws Exception {
        // Arrange
        List<ZakljucniListDto> dtos = new ArrayList<>();
        User user = new User();
        user.setEmail("test@example.com");
        user.setZa_sif_sekret(1);
        Sekretarijat sekretarijat = new Sekretarijat();


        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(sekretarijarService.getSekretarijat(1)).thenReturn(sekretarijat);
        when(zakljucniListZbService.checkIfExistValidZListAndFindVersion(anyInt(), anyInt())).thenReturn(1);

       // assertEquals(zakljucniListZbService.saveZakljucniList(dtos, 1, 1, 2023, "test@example.com").getVerzija(), 1);
        // Act and Assert
//        assertThrows(zakljucniListZbService.saveZakljucniList(dtos, 1, 1, 2023, "test@example.com"));
    }

    @Test
    @Disabled
    public void testCheckJbbks() throws Exception {
        // Arrange
        User user = new User();
        user.setSifra_pp(1);
        when(pPartnerService.getJBBKS(anyInt())).thenReturn(1);

        // Act and Assert
        zakljucniListZbService.checkJbbks(user, 1);
        assertThrows(Exception.class, () -> zakljucniListZbService.checkJbbks(user, 2));

    }

    @Test
    @Disabled
    public void testCheckDuplicatesKonta() throws Exception {
        // Arrange
        List<ZakljucniListDto> dtos = new ArrayList<>();
//        List<ZakljucniListDto> dtosNotSame = new ArrayList<>();

        ZakljucniListDto dto1 = new ZakljucniListDto();
        dto1.setProp1("test");
        dtos.add(dto1);
//        dtosNotSame.add(dto1);
        ZakljucniListDto dto2 = new ZakljucniListDto();
        dto2.setProp1("test");
        dtos.add(dto2);
//        ZakljucniListDto dto3 = new ZakljucniListDto();
//        dto2.setProp1("testNotSame");
//        dtosNotSame.add(dto3);

        // Act and Assert
        assertThrows(Exception.class,
                () -> zakljucniListZbService.checkDuplicatesKonta(dtos));
       // assertDoesNotThrow(() -> zakljucniListZbService.checkDuplicatesKonta(dtosNotSame));
    }

    @Test
    @Disabled
    public void testCheckIfNotDuplicatesKonta() throws Exception {
        // Arrange
        List<ZakljucniListDto> dtos = new ArrayList<>();

        ZakljucniListDto dto1 = new ZakljucniListDto();
        dto1.setProp1("test");
        dtos.add(dto1);
        ZakljucniListDto dto2 = new ZakljucniListDto();
        dto2.setProp1("testDifferent");
        dtos.add(dto2);
        // Act and Assert
        assertDoesNotThrow(() -> zakljucniListZbService.checkDuplicatesKonta(dtos));
    }
}
