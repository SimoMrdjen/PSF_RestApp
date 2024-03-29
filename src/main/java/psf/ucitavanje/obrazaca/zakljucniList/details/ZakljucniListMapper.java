package psf.ucitavanje.obrazaca.zakljucniList.details;

import org.springframework.stereotype.Component;
import psf.ucitavanje.obrazaca.zakljucniList.ZakljucniListDto;
import psf.ucitavanje.obrazaca.zakljucniList.zb.ZakljucniListZb;

@Component
public class ZakljucniListMapper {

    public ZakljucniListDetails mapDtoToEntity(ZakljucniListDto dto,
                                               ZakljucniListZb zb,
                                               String oznakaGlave) {
        var konto = Integer
                .parseInt(dto.getProp1().trim());
        return ZakljucniListDetails.builder()
                .GEN_MYSQL(zb.getGenMysql())
                .GEN_INTERBASE(0)
                .GEN_OPENTAB(zb.getGEN_OPENTAB())
                .GEN_APVDBK(zb.getGEN_APVDBK())
                .GODINA(zb.getGODINA())
                .VERZIJA(zb.getVerzija())
                .KOJI_KVARTAL(zb.getKojiKvartal())
                .SIF_SEKRET(zb.getSIF_SEKRET())
                .JBBK(zb.getJBBK())
                .JBBK_IND_KOR(zb.getJbbkIndKor())
                .SIF_RAC(zb.getSIF_RAC())
                .RAZDEO(zb.getRAZDEO())
                .OZNAKAGLAVE(oznakaGlave)
                .SIN_KONTO(konto / 100)
                .KONTO(konto)
                .RED_BROJ_AKT(0)
                .DUGUJE_PS(dto.getProp2())
                .POTRAZUJE_PS(dto.getProp3())
                .DUGUJE_PR(dto.getProp4())
                .POTRAZUJE_PR(dto.getProp5())
                .UNOSIO(zb.getPOSLAO_NAM())
                .build();
    }

}
