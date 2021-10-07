package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Document;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import com.equipe2.projet_integre_equipe2.service.DocumentService;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;

import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;


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
    void setup(){
        document = document.builder()
                .documentName("CvInfo")
                .student(null)
                .data("test".getBytes(StandardCharsets.UTF_8))
                .build();
    }

    @Test
    public void receiveDocumentTest() throws Exception {
        multipartFile = new MockMultipartFile("uploadFile","CvInfo:0",null,"test".getBytes(StandardCharsets.UTF_8));
        when(documentService.createDocument(multipartFile)).thenReturn(Optional.of(document));

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.multipart("/uploadcv")
                .file((MockMultipartFile) multipartFile))
                .andReturn();

        var actualresponse = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Boolean.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualresponse).isEqualTo(true);
    }
}
