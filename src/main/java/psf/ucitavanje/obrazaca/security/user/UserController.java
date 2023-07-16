package psf.ucitavanje.obrazaca.security.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final IndLozinkaService indLozinkaService;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return ResponseEntity.ok(indLozinkaService
                .getAllUsers());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDto> getUser() {
        return ResponseEntity.ok(indLozinkaService
                .getUser());
    }

    @GetMapping("/like")
    public ResponseEntity<List<UserDto>> getUserByUsernameLike(@RequestParam String UsernameLike) {
        return ResponseEntity.ok(indLozinkaService
                .getUsersLike(UsernameLike));
    }

    @PostMapping
    public ResponseEntity<UserDto> addUser(@Valid @RequestBody UserDto userDto) throws Exception {
        return ResponseEntity.ok(indLozinkaService
                .createUser(userDto));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto,
                                      @PathVariable(name = "id") Integer id) throws Exception {
        return ResponseEntity.ok(indLozinkaService
                .updateUser(userDto));
    }


}
