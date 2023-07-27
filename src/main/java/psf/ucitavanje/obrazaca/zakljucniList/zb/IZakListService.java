package psf.ucitavanje.obrazaca.zakljucniList.zb;

import psf.ucitavanje.obrazaca.security.user.User;
import psf.ucitavanje.obrazaca.zakljucniList.ZakljucniListDto;

import java.util.List;

public interface IZakListService {
    void checkDuplicatesKonta(List<ZakljucniListDto> dtos);
    ZakljucniListZb saveZakljucniList(List<ZakljucniListDto> dtos,
                                      Integer kvartal,
                                      Integer jbbks,
                                      Integer year,
                                      String email);
   void checkJbbks(User user, Integer jbbksExcell);

    Integer checkIfExistValidZListAndFindVersion(Integer jbbks, Integer kvartal);
}
