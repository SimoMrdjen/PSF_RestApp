package psf.ucitavanje.obrazaca.zakljucniList.zb;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import psf.ucitavanje.obrazaca.IOobrazac.obrazac5_pom.ObrazacIODetailService;
import psf.ucitavanje.obrazaca.obrazac5.ppartner.PPartnerService;
import psf.ucitavanje.obrazaca.obrazac5.sekretarijat.SekretarijarService;
import psf.ucitavanje.obrazaca.security.user.UserRepository;
import psf.ucitavanje.obrazaca.zakljucniList.ZakljucniListDto;

import java.util.List;

@RequiredArgsConstructor
@Service
@Component
public class ZakljucniListZbService {

    private final ZakljucniListZbRepository zakljucniRepository;
    private final SekretarijarService sekretarijarService;
    private final PPartnerService pPartnerService;
    private final ObrazacIODetailService obrazacIODetailService;
    private final UserRepository userRepository;

    public ZakljucniListZb saveZakljucniList(List<ZakljucniListDto> dtos, Integer kvartal, Integer days, String email) {

        return null;
    }
}
