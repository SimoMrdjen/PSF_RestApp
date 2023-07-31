package psf.ucitavanje.obrazaca.security.auth;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import psf.ucitavanje.obrazaca.security.user.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private Integer sifraradnika;
    private Integer za_sif_sekret;
    private Integer sif_oblast;
    private Integer sifra_pp;
    private String email;
    private String password;
    private Role role;
}
