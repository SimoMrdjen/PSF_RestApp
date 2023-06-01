package psf.ucitavanje.obrazaca.obrazac5.ind_lozinka;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IndLozinkaRepository extends JpaRepository<IndLozinka, Integer> {
    Optional<IndLozinka> findById(Integer id);
}
