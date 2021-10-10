package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Document;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.DocumentRepository;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Service
public class DocumentService {

    public DocumentRepository documentRepository;

    public StudentRepository studentRepository;

    public DocumentService(DocumentRepository documentRepository, StudentRepository studentRepository){
        this.documentRepository = documentRepository;
        this.studentRepository = studentRepository;
    }

    public Optional<Document> createDocument(MultipartFile multipartFile) {
        try {
            String[] signatureFile = java.net.URLDecoder.decode(multipartFile.getOriginalFilename(),
                    StandardCharsets.UTF_8).replace("\"","").split(":");

            Document document = new Document();
            document.setDocumentName(signatureFile[0]);
            document.setData(multipartFile.getBytes());
            document.setStudent(studentRepository.getById(Integer.parseInt(signatureFile[1])));
            return Optional.of(documentRepository.save(document));
        } catch (Exception exception){
            return Optional.empty();
        }
    }

    public Optional<List<Document>> getAllDocumentsByStudentId(Integer idStudent){
        try {
            return Optional.of(documentRepository.findDocumentsByStudent_Id(idStudent));
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
