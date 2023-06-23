package psf.ucitavanje.obrazaca.security.user;

import org.springframework.data.jpa.repository.JpaRepository;
import psf.ucitavanje.obrazaca.security.user.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUsername(String username);
}
