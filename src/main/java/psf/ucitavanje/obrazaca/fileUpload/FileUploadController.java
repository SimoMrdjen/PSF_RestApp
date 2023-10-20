package psf.ucitavanje.obrazaca.fileUpload;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileWriter;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class FileUploadController {

    @Value("${download.path}") // Configure this in your application properties
    private String uploadPath;

    private final FileUploadService service;


    @PostMapping("/excel/{year}/{kvartal}/{typeOfObrazac}")
    public String uploadExcelFile(@RequestParam("file") MultipartFile file,
                                  @PathVariable(name = "year") Integer year,
                                  @PathVariable(name = "kvartal") Integer kvartal,
                                  @PathVariable(name = "typeOfObrazac") String typeOfObrazac
    ) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        String uploadPath = service.createPath(year, email, kvartal, typeOfObrazac);

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

    @PostMapping("/txt/{year}/{kvartal}/{typeOfObrazac}")
    public void uploadTxtFile(@RequestBody TxtContent content,
                                @PathVariable(name = "year") Integer year,
                                @PathVariable(name = "kvartal") Integer kvartal,
                                @PathVariable(name = "typeOfObrazac") String typeOfObrazac
    ) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        String uploadPath = service.createPath(year, email, kvartal, typeOfObrazac);
        var fileName = service.getDateAndTimeAsPartOfFilePath();
        var ExtendedFileName = fileName + ".txt";
        Path filePath = Paths.get(uploadPath, ExtendedFileName);

        try {
            FileWriter fileWriter = new FileWriter(filePath.toString());
            fileWriter.write(content.getText());
            fileWriter.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/download")
    public ResponseEntity<?> downloadFile() {
        try {
            var fileName ="ZakljucniList.xlsx";

  //          Path filePath = Paths.get("C:/Users/simo.mrdjen/Desktop/Obrasci", fileName).normalize();
            //PRODUCTION
           Path filePath = Paths.get("C:/Users/pavel/Desktop/Obrasci", fileName).normalize();

            Resource resource = new FileSystemResource(filePath);
            if (!resource.exists() || !resource.isReadable()) {
                throw new RuntimeException("Error: File not found or not readable!");
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (Exception ex) {
            throw new RuntimeException("Error while downloading the file. Error was: " + ex.getMessage());
        }
    }
}
