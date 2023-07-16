package psf.ucitavanje.obrazaca.security.user;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public List<UserDto> getAllUsers() {
        return  null;
    }

    public UserDto getUser() {
        return null;
    }

    public List<UserDto> getUsersLike(String usernameLike) {
        return null;
    }

    public UserDto createUser(UserDto userDto) {
        return  null;
    }

    public UserDto updateUser(UserDto userDto) {
        return null;
    }
}
