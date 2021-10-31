package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Internship;
import com.equipe2.projet_integre_equipe2.model.Supervisor;
import com.equipe2.projet_integre_equipe2.repository.SupervisorRepository;
import com.equipe2.projet_integre_equipe2.service.InternshipService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(InternshipController.class)
public class InternshipControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private InternshipService internshipService;

    @Mock
    private SupervisorRepository supervisorRepository;

    private Internship internship;

    @BeforeEach
    void setup() {
        internship = Internship.builder()
                .isSignedByStudent(false)
                .isSignedByMonitor(false)
                .offer(null)
                .student(null)
                .build();
    }

    @Test
    public void saveInternshipTest() throws Exception {
        when(internshipService.saveInternship(internship)).thenReturn(Optional.of(internship));

        MvcResult result = mockMvc.perform(post("/internship/save-internship")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(internship))).andReturn();

        var actualInternship = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Internship.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(internship).isEqualTo(actualInternship);
    }

    @Test
    public void getAllInternshipsTest() throws Exception {
        List<Internship> internshipList = getListOfInternships();
        when(internshipService.getAllInternships()).thenReturn(Optional.of(internshipList));

        MvcResult result = mockMvc.perform(get("/internship/get-all-internships")
                        .contentType(MediaType.APPLICATION_JSON))
                        .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(3);
    }

    @Test
    public void getAllInternshipsBySupervisorIdTest() throws Exception {
        Supervisor supervisor = Supervisor.supervisorBuilder()
                .id(1)
                .firstName("toto")
                .lastName("tata")
                .matricule("1234567")
                .password("password")
                .build();

        List<Internship> internshipList = getListOfInternships();

        when(internshipService.getAllInternshipBySupervisorId(supervisor.getId())).thenReturn(Optional.of(internshipList));

        MvcResult result = mockMvc.perform(get("/internship/get-all-internships-by-supervisor/{idSupervisor}",1)
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(),List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(3);
    }

    private List<Internship> getListOfInternships() {
        List<Internship> internshipList = new ArrayList<>();
        internshipList.add(internship = Internship.builder()
                .isSignedByStudent(false)
                .isSignedByMonitor(false)
                .offer(null)
                .student(null)
                .supervisor(null)
                .status("StudentSignature")
                .build());
        internshipList.add(internship = Internship.builder()
                .isSignedByStudent(false)
                .isSignedByMonitor(false)
                .offer(null)
                .student(null)
                .supervisor(null)
                .status(null)
                .build());
        internshipList.add(internship = Internship.builder()
                .isSignedByStudent(false)
                .isSignedByMonitor(false)
                .offer(null)
                .student(null)
                .supervisor(null)
                .status(null)
                .build());
        return internshipList;
    }
}
