package psf.ucitavanje.obrazaca.security.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import psf.ucitavanje.obrazaca.security.auth.RegisterRequest;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto //extends RegisterRequest
{
    //RegisterRequest
    private Integer sifraradnika;
    private Integer za_sif_sekret;
    private Integer sif_oblast;
    private Integer sifra_pp;
    private String ime;
    private String lozinka;
    private String email;
    private String password;
    private Role role;
}
