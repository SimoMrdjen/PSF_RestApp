package psf.ucitavanje.obrazaca.obrazac5.obrazac5_old;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import psf.ucitavanje.obrazaca.obrazac5.Obrazac5DTO;
import psf.ucitavanje.obrazaca.obrazac5.obrazac5_old.IObr5Service;

import java.util.List;

@RestController
@RequestMapping(value = "/api/obrazac5")
@RequiredArgsConstructor
public class Obr5Controller {

    private final IObr5Service service;

    @PostMapping
    public List<Obrazac5DTO> saveAll(@RequestBody List<Obrazac5DTO> dtos) {
        return service.saveAll(dtos);
    }

}
