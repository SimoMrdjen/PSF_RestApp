package psf.ucitavanje.obrazaca.obrazac5.obrazacZb;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import psf.ucitavanje.obrazaca.obrazac5.Obrazac5DTO;
import psf.ucitavanje.obrazaca.zakljucniList.ZakljucniListDto;
import psf.ucitavanje.obrazaca.zakljucniList.zb.ZakljucniListZb;

import java.util.List;

@RestController
@RequestMapping(value = "/api/obrazac_zb")
@RequiredArgsConstructor
public class ObrazacZbController {

    private final ObrazacZbService obrazacZbService;

    @PostMapping(value = "/{kvartal}")
    public ResponseEntity<?> addObrazacZb(@RequestBody List<Obrazac5DTO> dtos,
                                                  @PathVariable(name = "kvartal") Integer kvartal) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        try {
            return ResponseEntity.ok(obrazacZbService.saveObrazac5(dtos, kvartal, email));
        }
        catch (Exception e) {
            // Handle the exception and return an error response with status code 400
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
