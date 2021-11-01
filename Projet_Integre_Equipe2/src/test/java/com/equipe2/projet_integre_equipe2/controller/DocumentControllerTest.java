package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Document;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import com.equipe2.projet_integre_equipe2.service.DocumentService;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;


@WebMvcTest(DocumentController.class)
public class DocumentControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DocumentService documentService;

    @Mock
    private StudentRepository studentRepository;

    private Document document;

    private MultipartFile multipartFile;

    @BeforeEach
    void setup() {
        document = document.builder()
                .idDocument(1)
                .documentName("CvInfo")
                .student(null)
                .data("test".getBytes(StandardCharsets.UTF_8))
                .isValid(false)
                .isRefused(false)
                .build();
    }

    @Test
    public void receiveDocumentTest() throws Exception {
        multipartFile = new MockMultipartFile("uploadFile", "CvInfo:0", null, "test".getBytes(StandardCharsets.UTF_8));
        when(documentService.createDocument(multipartFile)).thenReturn(Optional.of(document));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.multipart("/uploadcv")
                        .file((MockMultipartFile) multipartFile))
                .andReturn();

        var actualResponse = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Boolean.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualResponse).isEqualTo(true);
    }

    @Test
    public void getAllDocumentsByStudentTest() throws Exception {
        Student student = Student.studentBuilder()
                .id(1)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .isCvValid(true)
                .build();
        List<Document> documentList = getListOfDocumentsByStudent();
        when(documentService.getAllDocumentsByStudentId(student.getId())).thenReturn(Optional.of(documentList));

        MvcResult result = mockMvc.perform(get("/document/get-all-documents/{idStudent}", 1)
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(3);
    }

    @Test
    public void updateDocumentTrueTest() throws Exception {
        document.setIsValid(true);
        when(documentService.updateDocumentStatus(document.getIdDocument(), true)).thenReturn(Optional.of(document));

        MvcResult result = mockMvc.perform(put("/document/update-document/" + document.getIdDocument() + "/status/" + document.getIsValid())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(document))).andReturn();

        var actualDocument = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Document.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualDocument.getIsValid()).isTrue();
        assertThat(actualDocument.getIsRefused()).isFalse();
        assertThat(document).isEqualTo(actualDocument);
    }

    @Test
    public void updateDocumentFalseTest() throws Exception {
        document.setIsRefused(true);
        when(documentService.updateDocumentStatus(document.getIdDocument(), false)).thenReturn(Optional.of(document));

        MvcResult result = mockMvc.perform(put("/document/update-document/" + document.getIdDocument() + "/status/" + document.getIsValid())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(document))).andReturn();

        var actualDocument = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Document.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualDocument.getIsValid()).isFalse();
        assertThat(actualDocument.getIsRefused()).isTrue();
        assertThat(document).isEqualTo(actualDocument);
    }

    @Test
    public void getAllDocumentsValidByStudentTest() throws Exception {
        Student student = Student.studentBuilder()
                .id(1)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .isCvValid(true)
                .build();

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

        when(documentService.getAllDocumentsValidByStudentId(student.getId())).thenReturn(Optional.of(documentList));

        MvcResult result = mockMvc.perform(get("/document/get-all-documents-valid/{idStudent}", 1)
                .contentType(MediaType.APPLICATION_JSON)).andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(2);
    }

    @Test
    public void getAllDocumentsTest() throws Exception {
        List<Document> documentList = getListOfDocuments();
        when(documentService.getAllDocuments()).thenReturn(Optional.of(documentList));

        MvcResult result = mockMvc.perform(get("/document/get-all-documents")
                .contentType(MediaType.APPLICATION_JSON)).andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(),
                new TypeReference<List<Document>>() {});
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(3);
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

    private List<Document> getListOfDocuments() {
        List<Document> documentList = new ArrayList<>();
        documentList.add(Document.builder()
                .documentName("cv1")
                .isValid(false)
                .data(null)
                .student(null)
                .build());
        documentList.add(Document.builder()
                .documentName("cv2")
                .isValid(true)
                .data(null)
                .student(null)
                .build());
        documentList.add(Document.builder()
                .documentName("cv3")
                .isValid(true)
                .data(null)
                .student(null)
                .build());
        return documentList;
    }
}
