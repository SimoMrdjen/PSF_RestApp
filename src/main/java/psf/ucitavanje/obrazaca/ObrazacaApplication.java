package psf.ucitavanje.obrazaca;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import psf.ucitavanje.obrazaca.security.auth.AuthenticationService;
import psf.ucitavanje.obrazaca.security.auth.RegisterRequest;

import static psf.ucitavanje.obrazaca.security.user.Role.ADMIN;

@SpringBootApplication
public class ObrazacaApplication {

    public static void main(String[] args) {
        SpringApplication.run(ObrazacaApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(
            AuthenticationService service
    ) {
        return args -> {
            var admin = RegisterRequest.builder()
                    .sifraradnika(31)
                    .za_sif_sekret(30)
                    .sif_oblast(1)
                    .sifra_pp(6203)
                    .email("simo.mrdjen568")
                    .password("dr.dirlija")
                    .role(ADMIN)
                    .build();
            System.out.println("Admin token: " + service.register(admin).getAccessToken());
            service.adaptOldUsers();




        };
    }

}
