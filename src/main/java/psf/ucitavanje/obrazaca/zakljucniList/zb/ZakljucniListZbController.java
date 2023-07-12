package psf.ucitavanje.obrazaca.zakljucniList.zb;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import psf.ucitavanje.obrazaca.zakljucniList.ZakljucniListDto;

import java.util.List;

@RestController
@RequestMapping(value = "/api/zakljucni_list")
@RequiredArgsConstructor
public class ZakljucniListZbController {

    private final ZakljucniListZbService zakljucniService;

    @PostMapping(value = "/{kvartal}/{days}/{year}")
    public ResponseEntity<ZakljucniListZb> addZakljucni(@RequestBody List<ZakljucniListDto> dtos,
                                                        @PathVariable(name = "kvartal") Integer kvartal,
                                                        @PathVariable(name = "days") Integer days,
                                                        @PathVariable(name = "year") Integer year) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return ResponseEntity.ok(zakljucniService.saveZakljucniList(dtos, kvartal, days,year, email));

    }
}
