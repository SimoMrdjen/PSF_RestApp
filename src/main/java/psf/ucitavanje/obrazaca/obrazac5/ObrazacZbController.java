package psf.ucitavanje.obrazaca.obrazac5;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/obrazac_zb")
@RequiredArgsConstructor
public class ObrazacZbController {

    private final ObrazacZbService obrazacZbService;

    @PostMapping(value = "/{kvartal}")
    public ObrazacZb addObrazacZb(@RequestBody List<Obrazac5DTO> dtos,
                                  @PathVariable(name = "kvartal") Integer kvartal) {
        return obrazacZbService.saveObrazac5(dtos, kvartal);

    }
}
