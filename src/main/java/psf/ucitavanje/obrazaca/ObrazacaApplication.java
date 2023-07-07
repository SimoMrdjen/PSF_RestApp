package psf.ucitavanje.obrazaca;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import psf.ucitavanje.obrazaca.security.auth.AuthenticationService;
import psf.ucitavanje.obrazaca.security.auth.RegisterRequest;
import psf.ucitavanje.obrazaca.security.user.Role;

import static psf.ucitavanje.obrazaca.security.user.Role.ADMIN;
import static psf.ucitavanje.obrazaca.security.user.Role.MANAGER;
import static psf.ucitavanje.obrazaca.security.user.Role.USER;

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
					.sifraradnika(4)
					.za_sif_sekret(30)
					.sif_oblast(1)
					.sifra_pp(6203)
					.email("simo4")
					.password("dr.dirlija")
					.role(ADMIN)
					.build();
			System.out.println("Admin token: " + service.register(admin).getAccessToken());
//
//			var manager = RegisterRequest.builder()
//					//.firstname("Admin")
//					//.lastname("Admin")
//					.email("manager@mail.com")
//					.password("password")
//					.role(MANAGER)
//					.build();
//			System.out.println("Manager token: " + service.register(manager).getAccessToken());

		};
	}

}
