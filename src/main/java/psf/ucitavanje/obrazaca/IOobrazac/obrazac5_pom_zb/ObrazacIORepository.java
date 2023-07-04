package psf.ucitavanje.obrazaca.IOobrazac.obrazac5_pom_zb;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ObrazacIORepository extends JpaRepository<Obrazac5_pom_zb, Integer> {

    @Transactional
    @Query(value = "select MAX(verzija)  from obrazac5_pom_zb o where o.jbbk_ind_kor = ?1 and koji_kvartal = ?2",
            nativeQuery = true)
    Optional<Integer> getLastVersionValue(Integer jbbk, Integer kvartal);
}
