package psf.ucitavanje.obrazaca.obrazac5.ppartner;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import psf.ucitavanje.obrazaca.obrazac5.ind_lozinka.IndLozinkaService;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Component
public class PPartnerService {
    private final PPartnerRepository pPartnerRepository;
    private final IndLozinkaService indLozinkaService;

    public Integer getJBBKS(Integer radnik) {
        return pPartnerRepository.findById(indLozinkaService.getSifraPP(radnik))
                .get()
                .getJbkbs();
    }
}
