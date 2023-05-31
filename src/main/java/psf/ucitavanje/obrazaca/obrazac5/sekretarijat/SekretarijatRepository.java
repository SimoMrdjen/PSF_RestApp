package psf.ucitavanje.obrazaca.obrazac5.sekretarijat;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SekretarijatRepository extends JpaRepository<Sekretarijat, Integer> {
    @Override
    Optional<Sekretarijat> findById(Integer integer);
}
