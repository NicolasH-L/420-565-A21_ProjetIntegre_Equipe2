package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/document")
public class DocumentController {

    @Autowired
    DocumentService documentService;


    @ResponseBody
    @PostMapping(value = "/uploadcv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Boolean> ReceiveDocument(@RequestParam(name="uploadFile",required = false) MultipartFile uploadFile) throws IOException {
        return documentService.createDocument(uploadFile)
                .map(document1 -> ResponseEntity.status(HttpStatus.OK).body(true))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(false));
    }
}
