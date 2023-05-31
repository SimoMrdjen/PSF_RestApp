package psf.ucitavanje.obrazaca.obrazac5;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import psf.ucitavanje.obrazaca.obrazac5.obrazac.Obrazac;
import psf.ucitavanje.obrazaca.obrazac5.obrazac.ObrazacMapper;
import psf.ucitavanje.obrazaca.obrazac5.obrazac.ObrazacRepository;
import psf.ucitavanje.obrazaca.obrazac5.obrazac.ObrazacService;
import psf.ucitavanje.obrazaca.obrazac5.sekretarijat.SekretarijarService;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Component
public class ObrazacZbService {
    private final ObrazacZbRepository obrazacZbRepository;
    private final SekretarijarService sekretarijarService;
    private final ObrazacService obrazacService;

    public ObrazacZb saveObrazac5(List<Obrazac5DTO> dtos, Integer kvartal) {
        Object object = new Object();

        Integer verzija = 1; //fetch verzija
        Integer sifSekret = 30; //fetch from table user
        Integer razdeo  = sekretarijarService.getRazdeo(sifSekret); //fetch from table user or sekr, im not sure
        Integer radnik = 50001;//sifra usera
        Integer jbbk = 1000;//find  in PPARTNER by sifraPP in ind_lozinka ind_lozinkaService.getJbbk
        ObrazacZb zb = ObrazacZb.builder()
                .gen_interbase(1)
                .koji_kvartal(kvartal)
                .tip_obrazca(5)
                .sif_sekret(sifSekret)
                .razdeo(razdeo)
                .verzija(1)
                .dinarski(1)
                .status(0)
                .poslato_o(0)
                .radna(1)
                .povuceno(0)
                .konacno(0)
                .poslao_nam(radnik)
                .poslao_u_org(0)
                .poslao_iz_org(0)
                .zaprimio_ver(0)
                .overio_ver(0)
                .odobrio_ver(0)
                .proknjizeno(0)
                .jbbk_ind_kor(jbbk)
                .storno(0)
                .stosifrad(0)
                .opisstorno("_")
                .podigao_status(0)
                .datum_pod_statusa(0)
                .datum_org(0)
                .nivo_konsolidacije(0)
                .build();

        ObrazacZb zbSaved = obrazacZbRepository.save(zb);

        //call obrazacService - extract next code in new method
       // Integer genMySql = zbSaved.getGen_mysql();
        obrazacService.saveListObrazac(dtos, zbSaved);

//        List<Obrazac> obrazacList =
//                dtos.stream()
//                .filter(dto -> dto.getProp2() % 1000 != 0)
//                .map(obrazacMapper::mapDtoToEntity)
//                .collect(Collectors.toList());
//
//        obrazacList
//                .forEach(obrazac -> {
//                    obrazac.setGen_mysql(genMySql);
//                    obrazac.setVerzija(verzija);
//                    obrazac.setKoji_kvartal(kvartal);
//                    obrazac.setSif_sekret(sifSekret);
//                    obrazac.setRazdeo(razdeo);
//                    obrazac.setJbbk_ind_kor(JbbkIndKor);
//                });
//        obrazacRepository.saveAll(obrazacList);

        return zbSaved;
    }

}
