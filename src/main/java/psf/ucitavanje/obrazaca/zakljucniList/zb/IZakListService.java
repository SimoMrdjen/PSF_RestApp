package psf.ucitavanje.obrazaca.zakljucniList.zb;

import psf.ucitavanje.obrazaca.security.user.User;
import psf.ucitavanje.obrazaca.zakljucniList.ZakljucniListDto;

import java.util.List;

public interface IZakListService {
    //ZaKListResponse getLastValidVersionZList(Integer jbbks);

    //ZaKListResponse getLastValidVersionZList(String email) throws Exception;

    void checkDuplicatesKonta(List<ZakljucniListDto> dtos) throws Exception;
    StringBuilder saveZakljucniList(List<ZakljucniListDto> dtos,
                                    Integer kvartal,
                                    Integer jbbks,
                                    Integer year,
                                    String email) throws Exception;
   void checkJbbks(User user, Integer jbbksExcell) throws Exception;

    Integer checkIfExistValidZListAndFindVersion(Integer jbbks, Integer kvartal) throws Exception;


}
