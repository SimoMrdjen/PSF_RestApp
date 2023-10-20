package psf.ucitavanje.obrazaca.security.user;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import psf.ucitavanje.obrazaca.security.token.Token;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ind_lozinka")
public class User implements UserDetails {

    @Id
    private Integer sifraradnika;
    @Column
    private Integer za_sif_sekret;
    @Column(nullable = true)
    private Integer za_sif_rac;
    @Column
    private Integer sif_oblast;
    @Column
    private String ime;
    @Column
    private String lozinka;
    @Column
    private String sncert;
    @Column
    private String sncert_rez;
    @Column
    private Integer javno_pred;
    @Column
    private Integer sifra_pp;

    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<Token> tokens;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getAuthorities();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "User{}";
    }

    public User(Integer sifraradnika, Integer za_sif_sekret, Integer sifra_pp, String email) {
        this.sifraradnika = sifraradnika;
        this.za_sif_sekret = za_sif_sekret;
        this.sifra_pp = sifra_pp;
        this.email = email;
    }

    public void setRole(Role  role) {
        this.role = role;
    }
}
