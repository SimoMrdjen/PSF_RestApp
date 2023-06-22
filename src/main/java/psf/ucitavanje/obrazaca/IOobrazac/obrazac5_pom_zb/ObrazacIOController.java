package psf.ucitavanje.obrazaca.IOobrazac.obrazac5_pom_zb;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import psf.ucitavanje.obrazaca.IOobrazac.ObrazacIODTO;
import psf.ucitavanje.obrazaca.obrazac5.Obrazac5DTO;
import psf.ucitavanje.obrazaca.obrazac5.obrazac.ObrazacService;
import psf.ucitavanje.obrazaca.obrazac5.obrazacZb.ObrazacZb;
import psf.ucitavanje.obrazaca.obrazac5.obrazacZb.ObrazacZbService;

import java.util.List;

@RestController
@RequestMapping(value = "/api/obrazac_io")
@RequiredArgsConstructor
public class ObrazacIOController {

    private final ObrazacIOService obrazacIOService;

    @PostMapping(value = "/{kvartal}/{year}")
    public Obrazac5_pom_zb addObrazacIO(@RequestBody List<ObrazacIODTO> dtos,
                                  @PathVariable(name = "kvartal") Integer kvartal,
                                  @PathVariable(name = "year") Integer year) {
        return obrazacIOService.saveObrazacIO(dtos, kvartal, year);

    }
}
