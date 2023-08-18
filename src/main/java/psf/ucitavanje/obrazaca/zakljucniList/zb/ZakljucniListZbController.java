package psf.ucitavanje.obrazaca.zakljucniList.zb;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @PostMapping(value = "/{kvartal}/{jbbks}/{year}")
    public ResponseEntity<?> addZakljucni(@RequestBody List<ZakljucniListDto> dtos,
                                          @PathVariable(name = "kvartal") Integer kvartal,
                                          @PathVariable(name = "jbbks") Integer jbbks,
                                          @PathVariable(name = "year") Integer year) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        try {
            String result = String.valueOf(zakljucniService.saveZakljucniList(dtos, kvartal, jbbks, year, email));
            return ResponseEntity.ok(result);
        }
        catch (Exception e) {
            // Handle the exception and return an error response with status code 400
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/status/{id}")
    public ResponseEntity<?> raiseStatus(@PathVariable(name = "id") Integer id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        try {
            String result = String.valueOf(zakljucniService.raiseStatus(id, email));
            return ResponseEntity.ok(result);
        }
        catch (Exception e) {
            // Handle the exception and return an error response with status code 400
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<?> getZakList() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        try {
            ZaKListResponse result = zakljucniService.getLastValidVersionZList(email);
            return ResponseEntity.ok(result);
        }
        catch (Exception e) {
            // Handle the exception and return an error response with status code 400
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/storno/{id}")
    public ResponseEntity<?> stornoZakList(@PathVariable(name = "id") Integer id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        try {
            String result = String.valueOf(zakljucniService.stornoZakList(id, email));
            return ResponseEntity.ok(result);
        }
        catch (Exception e) {
            // Handle the exception and return an error response with status code 400
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    }
