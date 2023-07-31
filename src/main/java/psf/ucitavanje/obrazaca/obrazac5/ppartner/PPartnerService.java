package psf.ucitavanje.obrazaca.obrazac5.ppartner;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import psf.ucitavanje.obrazaca.security.user.UserService;

@RequiredArgsConstructor
@Service
@Component
public class PPartnerService {
    private final PPartnerRepository pPartnerRepository;
    private final UserService userService;

    public Integer getJBBKS(Integer ppartner) {

        return
                pPartnerRepository.findById(ppartner)
                .get()
                .getJbkbs();
    }
}
