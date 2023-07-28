package psf.ucitavanje.obrazaca.zakljucniList.zb;

import psf.ucitavanje.obrazaca.security.user.User;
import psf.ucitavanje.obrazaca.zakljucniList.ZakljucniListDto;

import java.util.List;

public interface IZakListService {
    void checkDuplicatesKonta(List<ZakljucniListDto> dtos) throws Exception;
    ZakljucniListZb saveZakljucniList(List<ZakljucniListDto> dtos,
                                      Integer kvartal,
                                      Integer jbbks,
                                      Integer year,
                                      String email) throws Exception;
   void checkJbbks(User user, Integer jbbksExcell) throws Exception;

    Integer checkIfExistValidZListAndFindVersion(Integer jbbks, Integer kvartal) throws Exception;
}
