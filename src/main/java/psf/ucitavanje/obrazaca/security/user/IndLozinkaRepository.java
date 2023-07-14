package psf.ucitavanje.obrazaca.security.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IndLozinkaRepository extends JpaRepository<IndLozinka, Integer> {
    Optional<IndLozinka> findById(Integer id);
}
