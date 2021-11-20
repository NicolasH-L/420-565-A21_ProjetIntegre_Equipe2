package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.*;
import com.equipe2.projet_integre_equipe2.repository.DocumentRepository;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import com.itextpdf.forms.PdfAcroForm;
import com.itextpdf.forms.fields.PdfFormField;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DocumentServiceTest {

    @Mock
    private DocumentRepository documentRepository;

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private DocumentService documentService;

    private Document document;

    private Student student;

    private Contract contract;

    private Internship internship;

    private Offer offer;

    private MultipartFile multipartFile;

    @BeforeEach
    void setup(){
        document = Document.builder()
                .documentName("CvInfo")
                .isValid(false)
                .isRefused(false)
                .student(null)
                .data("test".getBytes(StandardCharsets.UTF_8))
                .session("winter2022")
                .build();

        student = Student.studentBuilder()
                .id(1)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .build();
    }

    @Test
    public void testCreateDocument(){
        multipartFile = new MockMultipartFile("uploadFile","CvInfo:0:winter2022",null,"test".getBytes(StandardCharsets.UTF_8));
        when(documentRepository.save(document)).thenReturn(document);
        Optional<Document> actualDocument = documentService.createDocument(multipartFile);
        assertThat(actualDocument.get()).isEqualTo(document);
    }

    @Test
    public void testCreateDocumentFails(){
        multipartFile = new MockMultipartFile("uploadFile","CvInfo:0:winter2022",null,"test".getBytes(StandardCharsets.UTF_8));
        when(documentRepository.save(document)).thenReturn(null);
        Optional<Document> actualDocument = documentService.createDocument(multipartFile);
        assertThat(actualDocument).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetAllDocumentsByStudentId(){
        when(documentRepository.findDocumentsByStudent_Id(student.getId())).thenReturn(getListOfDocumentsByStudent());
        final Optional<List<Document>> allDocuments = documentService.getAllDocumentsByStudentId(student.getId());
        assertThat(allDocuments.get().size()).isEqualTo(3);
        assertThat(allDocuments.get().get(0).getIdDocument()).isEqualTo(1);
    }

    @Test
    public void testGetAllDocumentsByStudentIdFails(){
        when(documentRepository.findDocumentsByStudent_Id(student.getId())).thenReturn(null);
        final Optional<List<Document>> allDocuments = documentService.getAllDocumentsByStudentId(student.getId());
        assertThat(allDocuments).isEqualTo(Optional.empty());
    }

    @Test
    public void testUpdateDocumentStatusFalse() {
        document.setIsRefused(true);
        when(documentRepository.findById(document.getIdDocument())).thenReturn(Optional.of(document));
        when(documentRepository.saveAndFlush(document)).thenReturn(document);
        Optional<Document> actualDocument = documentService.updateDocumentStatus(document.getIdDocument(), false);
        assertThat(actualDocument.get().getDocumentName()).isEqualTo("CvInfo");
        assertThat(actualDocument.get().getIsValid()).isFalse();
        assertThat(actualDocument.get().getIsRefused()).isTrue();
    }

    @Test
    public void testUpdateDocumentStatusFalseFails() {
        when(documentRepository.findById(document.getIdDocument())).thenReturn(Optional.of(document));
        when(documentRepository.saveAndFlush(document)).thenReturn(null);
        Optional<Document> actualDocument = documentService.updateDocumentStatus(document.getIdDocument(), false);
        assertThat(actualDocument).isEmpty();
    }

    @Test
    public void testUpdateDocumentStatusTrue(){
        document.setIsValid(true);
        when(documentRepository.findById(document.getIdDocument())).thenReturn(Optional.of(document));
        when(documentRepository.saveAndFlush(document)).thenReturn(document);
        Optional<Document> actualDocument = documentService.updateDocumentStatus(document.getIdDocument(), true);
        assertThat(actualDocument.get().getDocumentName()).isEqualTo("CvInfo");
        assertThat(actualDocument.get().getIsValid()).isTrue();
        assertThat(actualDocument.get().getIsRefused()).isFalse();
    }

    @Test
    public void testUpdateDocumentStatusTrueFails(){
        when(documentRepository.findById(document.getIdDocument())).thenReturn(Optional.of(document));
        when(documentRepository.saveAndFlush(document)).thenReturn(null);
        Optional<Document> actualDocument = documentService.updateDocumentStatus(document.getIdDocument(), true);
        assertThat(actualDocument).isEmpty();
    }

    @Test
    public void testGetAllDocumentsValidByStudentId(){
        when(documentRepository.findDocumentsByIsValidTrueAndStudent_Id(student.getId())).thenReturn(getListOfDocumentsValidByStudent());
        final Optional<List<Document>> allDocuments = documentService.getAllDocumentsValidByStudentId(student.getId());
        assertThat(allDocuments.get().size()).isEqualTo(2);
        assertThat(allDocuments.get().get(0).getIdDocument()).isEqualTo(1);
    }

    @Test
    public void testGetAllDocumentsValidByStudentIdFails(){
        when(documentRepository.findDocumentsByIsValidTrueAndStudent_Id(student.getId())).thenReturn(null);
        final Optional<List<Document>> allDocuments = documentService.getAllDocumentsValidByStudentId(student.getId());
        assertThat(allDocuments).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetAllDocuments() {
        when(documentRepository.findAll()).thenReturn(getListOfDocuments());
        final Optional<List<Document>> allDocuments = documentService.getAllDocuments();
        assertThat(allDocuments.get().size()).isEqualTo(3);
        assertThat(allDocuments.get().get(0).getDocumentName()).isEqualTo("cv1");
    }

    @Test
    public void testGetAllDocumentsFails() {
        when(documentRepository.findAll()).thenReturn(null);
        final Optional<List<Document>> allDocuments = documentService.getAllDocuments();
        assertThat(allDocuments).isEqualTo(Optional.empty());
    }

    private List<Document> getListOfDocumentsByStudent() {
        List<Document> documentList = new ArrayList<>();
        documentList.add(Document.builder()
                .idDocument(1)
                .documentName("CvInfo")
                .student(null)
                .build());
        documentList.add(Document.builder()
                .documentName("CvInfo2")
                .student(null)
                .build());
        documentList.add(Document.builder()
                .documentName("CvInfo3")
                .student(null)
                .build());

        return documentList;
    }

    private List<Document> getListOfDocumentsValidByStudent() {
        List<Document> documentList = new ArrayList<>();
        documentList.add(Document.builder()
                .idDocument(1)
                .documentName("cv")
                .isValid(true)
                .data(null)
                .student(student)
                .build());
        documentList.add(Document.builder()
                .idDocument(2)
                .documentName("cvfalse")
                .isValid(true)
                .data(null)
                .student(student)
                .build());

        return documentList;
    }

    private List<Document> getListOfDocuments() {
        List<Document> documentList = new ArrayList<>();
        documentList.add(Document.builder()
                .documentName("cv1")
                .isValid(false)
                .data(null)
                .student(student)
                .build());
        documentList.add(Document.builder()
                .documentName("cv2")
                .isValid(true)
                .data(null)
                .student(student)
                .build());
        documentList.add(Document.builder()
                .documentName("cv3")
                .isValid(true)
                .data(null)
                .student(student)
                .build());
        return documentList;
    }
}
