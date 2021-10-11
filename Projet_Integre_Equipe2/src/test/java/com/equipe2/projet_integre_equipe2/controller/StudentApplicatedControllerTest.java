package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Document;
import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.model.StudentApplicated;
import com.equipe2.projet_integre_equipe2.service.StudentApplicatedService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(StudentApplicatedController.class)
public class StudentApplicatedControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentApplicatedService studentApplicatedService;

    private StudentApplicated studentApplicated;

    private Document document;

    private Offer offer;

    @BeforeEach
    void setup() {
        offer = Offer.builder()
                .idOffer(1)
                .companyName("test")
                .address("Montreal")
                .salary("111111111111")
                .jobTitle("Developpeur")
                .description("Java")
                .skills("Autonome")
                .jobSchedules("Temps plein")
                .workingHours("666666666")
                .monitorEmail("cegep@email.com")
                .isValid(true)
                .state("")
                .displayDate("2021-10-15")
                .deadlineDate("2021-10-30")
                .startInternshipDate("2021-10-30")
                .endInternshipDate("2021-12-30")
                .build();

        document = Document.builder()
                .documentName("CVExemple")
                .student(null)
                .data("test".getBytes(StandardCharsets.UTF_8))
                .build();

        studentApplicated = StudentApplicated.builder()
                .offer(offer)
                .document(document)
                .build();
    }

    @Test
    public void testSaveApplication() throws Exception {
        when(studentApplicatedService.saveApplication(studentApplicated)).thenReturn(Optional.of(studentApplicated));

        MvcResult result = mockMvc.perform(post("/offers-list/save-internship")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(studentApplicated))).andReturn();

        var actualInternship = new ObjectMapper().readValue(result.getResponse().getContentAsString(), StudentApplicated.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(studentApplicated).isEqualTo(actualInternship);
    }
}
