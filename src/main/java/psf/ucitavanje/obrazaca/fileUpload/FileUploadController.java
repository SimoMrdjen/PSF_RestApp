package psf.ucitavanje.obrazaca.fileUpload;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class FileUploadController {

//    @Value("${upload.path}") // Configure this in your application properties
//    private String uploadPath;

    private  final FileUploadService service;


    @PostMapping("/{year}/{kvartal}/{typeOfObrazac}")
    public String uploadFile(@RequestParam("file") MultipartFile file,
                             @PathVariable(name = "year") Integer year,
                             @PathVariable(name = "kvartal") Integer kvartal,
                             @PathVariable(name = "typeOfObrazac") String typeOfObrazac
                             ) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        String uploadPath = service.createPath(year, email, kvartal,typeOfObrazac);

       try {
            String filePath = uploadPath + File.separator + service.getDateAndTimeAsPartOfFilePath() + " " +
                    file.getOriginalFilename();
            file.transferTo(new File(filePath));
            return "File uploaded successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "File upload failed.";
        }
    }
}
