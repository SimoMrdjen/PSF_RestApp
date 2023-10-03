package psf.ucitavanje.obrazaca.fileUpload;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import psf.ucitavanje.obrazaca.zakljucniList.zb.ZakljucniListZbService;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class FileUploadService {

    @Value("${upload.path}") // Configure this in your application properties
    private String uploadPath;

    private final ZakljucniListZbService zakljucniListZbService;

    public String getDateAndTimeAsPartOfFilePath() {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH-mm");
        return LocalDateTime.now().format(formatter);
    }

    public String createPath(Integer year, String email, Integer kvartal, String typeOfObrazac ) {

        Integer jbbk =  zakljucniListZbService.getJbbksIBK(email);
        String path = uploadPath + "/" + year;
        File directory = new File(path);
        if (!directory.exists()) {
            boolean result =
                    directory.mkdir();
        }
        path += "/KVARTAL_" + kvartal;
        File directoryKvartal = new File(path);
        if (!directoryKvartal.exists()) {
            boolean result =
                    directoryKvartal.mkdir();
        }
        path += "/" + jbbk;
        File directoryJbbk = new File(path);
        if (!directoryJbbk.exists()) {
            boolean result =
                    directoryJbbk.mkdir();
        }

//        path += "/" + typeOfObrazac;
//        File directoryType = new File(path);
//        if (!directoryType.exists()) {
//            boolean result =
//                    directoryType.mkdir();
//        }
        return path;

    }
}
