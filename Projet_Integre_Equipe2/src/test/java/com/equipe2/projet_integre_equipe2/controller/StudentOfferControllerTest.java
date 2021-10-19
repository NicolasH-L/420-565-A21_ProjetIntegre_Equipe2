package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Document;
import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.model.StudentOffer;
import com.equipe2.projet_integre_equipe2.service.StudentOfferService;
import com.fasterxml.jackson.core.type.TypeReference;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(StudentOfferController.class)
public class StudentOfferControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StudentOfferService studentOfferService;

    private StudentOffer studentOffer;

    private Document document;
    private Document document2;

    private Student student;
    private Student student2;

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

        document2 = Document.builder()
                .documentName("CVExemple2")
                .student(null)
                .data("test2".getBytes(StandardCharsets.UTF_8))
                .build();

        student = Student.studentBuilder()
                .id(1)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .isCvValid(true)
                .build();

        student2 = Student.studentBuilder()
                .id(2)
                .firstName("didi")
                .lastName("coco")
                .matricule("1234588")
                .password("didi1*")
                .isCvValid(true)
                .build();

        studentOffer = StudentOffer.builder()
                .offer(offer)
                .document(document)
                .student(student)
                .build();
    }

    @Test
    public void testSaveStudentOffer() throws Exception {
        when(studentOfferService.saveStudentOffer(studentOffer)).thenReturn(Optional.of(studentOffer));

        MvcResult result = mockMvc.perform(post("/offers-list/save-student-offer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(studentOffer))).andReturn();

        var actualInternship = new ObjectMapper().readValue(result.getResponse().getContentAsString(), StudentOffer.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(studentOffer).isEqualTo(actualInternship);
    }

    @Test
    public void testIsStudentOfferExist() throws Exception {
        when(studentOfferService.isStudentAppliedToOffer(offer.getIdOffer(), student.getId())).thenReturn(Optional.of(true));

        MvcResult result = mockMvc.perform(get("/offers-list/offer-applied/"+offer.getIdOffer()+"/"+student.getId())
                .contentType(MediaType.APPLICATION_JSON)).andReturn();

        var actualIsStudentOfferExist = new ObjectMapper().readValue(result.getResponse()
                .getContentAsString(), Boolean.class);

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualIsStudentOfferExist).isEqualTo(true);
    }

    @Test
    public void testGetAllStudentOffersByOffer_IdOffer() throws Exception {
        when(studentOfferService.getAllStudentOffersByOffer_IdOffer(offer.getIdOffer())).thenReturn(Optional.of(getListOfStudentOffersByIdOffer()));

        MvcResult result = mockMvc.perform(get("/offers-list/get-all-studentOffersByIdOffer/" + offer.getIdOffer())
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<List<StudentOffer>>(){
        });

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(2);
    }

    private List<StudentOffer> getListOfStudentOffersByIdOffer() {
        List<StudentOffer> studentOfferList = new ArrayList<>();
        studentOfferList.add(StudentOffer.builder()
                .offer(offer)
                .document(document)
                .student(student)
                .build());
        studentOfferList.add(StudentOffer.builder()
                .offer(offer)
                .document(document2)
                .student(student2)
                .build());
        return  studentOfferList;
    }
}
