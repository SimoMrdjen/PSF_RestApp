package psf.ucitavanje.obrazaca.zakljucniList.zb;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ZaKListResponse {
    LocalDate date;
    Integer kvartal;
    Integer year;
    Integer version;
    Integer jbbk;
    Integer status;
}
