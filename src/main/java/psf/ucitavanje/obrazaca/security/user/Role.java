package psf.ucitavanje.obrazaca.security.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static psf.ucitavanje.obrazaca.security.user.Permission.MANAGER_CREATE;
import static psf.ucitavanje.obrazaca.security.user.Permission.MANAGER_DELETE;
import static psf.ucitavanje.obrazaca.security.user.Permission.MANAGER_READ;
import static psf.ucitavanje.obrazaca.security.user.Permission.MANAGER_UPDATE;

@RequiredArgsConstructor
public enum Role {

    USER(Collections.emptySet()),
    ADMIN(Collections.emptySet()
//          Set.of(
//                  ADMIN_READ,
//                  ADMIN_UPDATE,
//                  ADMIN_DELETE,
//                  ADMIN_CREATE,
//                  MANAGER_READ,
//                  MANAGER_UPDATE,
//                  MANAGER_DELETE,
//                  MANAGER_CREATE
//          )
    ),
    MANAGER(
            Set.of(
                    MANAGER_READ,
                    MANAGER_UPDATE,
                    MANAGER_DELETE,
                    MANAGER_CREATE
            )
    );

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        // authorities.add(new SimpleGrantedAuthority(this.name()));

        return authorities;
    }
}
