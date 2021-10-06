package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Document;
import com.equipe2.projet_integre_equipe2.repository.DocumentRepository;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

@Service
public class DocumentService {

    public DocumentRepository documentRepository;

    public StudentRepository studentRepository;

    public DocumentService(DocumentRepository documentRepository){
        this.documentRepository = documentRepository;
    }

    public void createFile(MultipartFile multipartFile){
        File file = new File("src/main/resources/targetFile.pdf");

        try (OutputStream os = new FileOutputStream(file)) {
            os.write(multipartFile.getBytes());
        } catch (IOException exception) {
            exception.printStackTrace();
        }
    }

    public void saveFile(MultipartFile multipartFile, String documentName, int studentId) throws IOException {
        Document document = new Document();
        document.setDocumentName(documentName);
        document.setData(multipartFile.getBytes());
        document.setStudent(studentRepository.getById(studentId));
        documentRepository.save(document);
    }

}
