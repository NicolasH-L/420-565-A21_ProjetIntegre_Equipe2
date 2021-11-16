package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Document;
import com.equipe2.projet_integre_equipe2.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8100", "http://localhost"})
public class DocumentController {

    @Autowired
    DocumentService documentService;

    @ResponseBody
    @PostMapping(value = "/uploadcv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Boolean> ReceiveDocument(@RequestParam(name="uploadFile") MultipartFile uploadFile) {
        return documentService.createDocument(uploadFile)
                .map(document1 -> ResponseEntity.status(HttpStatus.OK).body(true))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(false));
    }

    @GetMapping("/document/get-all-documents/{idStudent}")
    public ResponseEntity<List<Document>> getAllDocumentsByStudent(@PathVariable Integer idStudent){
        return documentService.getAllDocumentsByStudentId(idStudent)
                .map(student1 -> ResponseEntity.status(HttpStatus.OK).body(student1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PutMapping("/document/update-document/{idDocument}/status/{isValid}")
    public ResponseEntity<Document> declineDocument(@PathVariable Integer idDocument, @PathVariable Boolean isValid){
        return documentService.updateDocumentStatus(idDocument, isValid)
                .map(document1 -> ResponseEntity.status(HttpStatus.OK).body(document1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/document/get-all-documents-valid/{idStudent}")
    public ResponseEntity<List<Document>> getAllDocumentsValidByStudent(@PathVariable Integer idStudent){
        return documentService.getAllDocumentsValidByStudentId(idStudent)
                .map(document1 -> ResponseEntity.status(HttpStatus.OK).body(document1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
