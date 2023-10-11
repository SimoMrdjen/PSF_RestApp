package psf.ucitavanje.obrazaca.security.auth;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import psf.ucitavanje.obrazaca.security.token.TokenRepository;
import psf.ucitavanje.obrazaca.security.user.Role;
import psf.ucitavanje.obrazaca.security.user.User;
import psf.ucitavanje.obrazaca.security.user.UserRepository;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class AuthenticationServiceTest {

    @Mock
     UserRepository repository;

    @Mock
    PasswordEncoder passwordEncoder;

    @InjectMocks
    AuthenticationService service;

    List<User> users;
    List<User> addaptedUsers;
    List<User> originUsers;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        users = List.of(
                new User(1,1,1,1,"Simo",
                        "pass", "a", "o", 1, 1,
                        null,null, null, null),
                new User(2,2,2,2,"Maki",
                        "PASS", "a", "o", 2, 2,
                        null,null, null, null)
        );
        originUsers = List.of(
                new User(1,1,1,1,"Simo",
                        "pass", "a", "o", 1, 1,
                        null,null, null, null),
                new User(2,2,2,2,"Maki",
                        "PASS", "a", "o", 2, 2,
                        null,null, null, null)
        );

        addaptedUsers = List.of(
                new User(1,1,1,1,"Simo",
                        "pass", "a", "o", 1, 1,
                        "Simo","ssap", Role.USER, null),
                new User(2,2,2,2,"Maki",
                        "PASS", "a", "o", 2, 2,
                        "Maki","SSAP", Role.USER, null)
        );
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void adaptOldUsers() {
        when(passwordEncoder.encode("pass")).thenReturn("ssap");
        when(passwordEncoder.encode("PASS")).thenReturn("SSAP");
        when(repository.findByEmailIsNull()).thenReturn(users);
        when(repository.saveAll(users)).thenReturn(users);
       var rteurnedUsers = service.adaptOldUsers();

        rteurnedUsers.forEach(user -> {
            System.out.print(user.getIme() + ", ");
            System.out.print(user.getEmail() + ", ");
            System.out.print(user.getLozinka() + ", ");
            System.out.print(user.getPassword() + ", ");
            System.out.println(user.getRole());
        });

        originUsers.forEach(user -> {
            System.out.print(user.getIme() + ", ");
            System.out.print(user.getEmail() + ", ");
            System.out.print(user.getLozinka() + ", ");
            System.out.print(user.getPassword() + ", ");
            System.out.println(user.getRole());
        });

        assertArrayEquals(addaptedUsers.toArray(), rteurnedUsers.toArray());

        assertNotEquals(originUsers, rteurnedUsers);
    }
}