package com.qzp.bid.global.util;

import com.qzp.bid.domain.deal.dto.ImageDto;
import com.qzp.bid.global.result.error.ErrorCode;
import com.qzp.bid.global.result.error.exception.BusinessException;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
@Slf4j
public class ImageUploader {

    @Value("${image.upload.path}")
    private String uploadPath;

    public List<ImageDto> upload(List<MultipartFile> multipartFiles) {
        if (multipartFiles == null || multipartFiles.isEmpty()) {
            return null;
        }
        List<ImageDto> imageDtos = new ArrayList<>();

        String OsUploadPath = uploadPath.replaceAll("/", Matcher.quoteReplacement(File.separator));

        for (MultipartFile multipartFile : multipartFiles) {
            if (!multipartFile.getContentType().startsWith("image")) {
                throw new BusinessException(ErrorCode.IS_NOT_IMAGE);
            }
            String uuid = UUID.randomUUID().toString();
            String saveFileName = uuid + "_" + multipartFile.getOriginalFilename();
            Path savePath = Paths.get(OsUploadPath, saveFileName);
            try {
                Files.createDirectories(savePath.getParent());
                multipartFile.transferTo(savePath);
            } catch (Exception e) {
                e.printStackTrace();
            }
            File saveFile = savePath.toFile();
            ImageDto imageDto = new ImageDto(saveFile.getAbsolutePath(),
                multipartFile.getOriginalFilename());
            imageDtos.add(imageDto);
        }
        return imageDtos;
    }

    private void removeOriginalFile(File targetFile) {
        if (targetFile.exists() && targetFile.delete()) {
            log.info("File delete success");
            return;
        }
        log.info("fail to remove");
    }

}
