package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Contract;
import com.equipe2.projet_integre_equipe2.model.Document;
import com.equipe2.projet_integre_equipe2.model.Internship;
import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.repository.DocumentRepository;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import com.itextpdf.forms.PdfAcroForm;
import com.itextpdf.forms.fields.PdfFormField;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
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
            document.setSession(signatureFile[2]);
            document.setData(multipartFile.getBytes());
            document.setStudent(studentRepository.getById(Integer.parseInt(signatureFile[1])));
            document.setIsValid(false);
            document.setIsRefused(false);
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

    public Optional<Document> updateDocumentStatus(Integer idDocument, Boolean isValid){
        try {
            Optional<Document> document = documentRepository.findById(idDocument);
            document.get().setIsValid(isValid);
            document.get().setIsRefused(!isValid);
            return Optional.of(documentRepository.saveAndFlush(document.get()));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Document>> getAllDocumentsValidByStudentId(Integer idStudent){
        try {
            return Optional.of(documentRepository.findDocumentsByIsValidTrueAndStudent_Id(idStudent));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Document>> getAllDocuments() {
        try {
            return Optional.of(documentRepository.findAll());
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
