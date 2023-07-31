package psf.ucitavanje.obrazaca.obrazac5.ind_lozinka;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Component
public class IndLozinkaService {

    private final IndLozinkaRepository indLozinkaRepository;

    @Transactional
    public Integer getSifraPP(Integer radnik) {
        return indLozinkaRepository.findById(radnik)
                .get()
                .getSifra_pp();
    }
}
