package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/document")
public class DocumentController {

    @Autowired
    DocumentService documentService;

    @ResponseBody
    @PostMapping(value = "/uploadcv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> ReceiveDocument(@RequestParam(name="uploadFile",required = false) MultipartFile uploadFile) throws IOException {
        String content = new String(uploadFile.getBytes());
        System.out.println(content);
        return ResponseEntity.ok().build();
    }


}
