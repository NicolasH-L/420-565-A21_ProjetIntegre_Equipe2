package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Supervisor;
import com.equipe2.projet_integre_equipe2.security.PasswordService;
import com.equipe2.projet_integre_equipe2.service.SupervisorService;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(SupervisorController.class)
public class SupervisorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SupervisorService supervisorService;

    private Supervisor supervisor;
    private Supervisor supervisorRegistered;
    private PasswordService passwordService;
    private String rawPassword = "toto1!";

    @BeforeEach
    void setup() {
        passwordService = new PasswordService();
        String encodedPassword = passwordService.encodePassword(rawPassword);
        supervisor = Supervisor.supervisorBuilder()
                .id(1)
                .firstName("toto")
                .lastName("toto")
                .matricule("1234567")
                .password(rawPassword)
                .build();

        supervisorRegistered = Supervisor.supervisorBuilder()
                .id(1)
                .firstName("toto")
                .lastName("toto")
                .matricule("1234567")
                .password(encodedPassword)
                .build();
    }

    @Test
    public void subscribeSupervisorTest() throws Exception {
        when(supervisorService.registerSupervisor(supervisor)).thenReturn(Optional.of(supervisorRegistered));

        MvcResult result = mockMvc.perform(post("/supervisors/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(supervisorRegistered))).andReturn();

        var actualSupervisor = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Supervisor.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(actualSupervisor).isEqualTo(supervisorRegistered);
    }

    @Test
    public void loginSupervisorTest() throws Exception {
        when(supervisorService.loginSupervisor(supervisor.getMatricule(), supervisor.getPassword())).thenReturn(Optional.of(supervisorRegistered));

        MvcResult result = mockMvc.perform(get("/supervisors/{matricule}/{password}", supervisor.getMatricule(), supervisor.getPassword())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actualStudent = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Supervisor.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualStudent).isEqualTo(supervisorRegistered);
    }

    @Test
    public void getAllSupervisorsTest() throws Exception {
        List<Supervisor> supervisorList = getListOfSupervisors();
        when(supervisorService.getAllSupervisors()).thenReturn(Optional.of(supervisorList));

        MvcResult result = mockMvc.perform(get("/supervisors/get-all-supervisors")
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(3);
    }

    private List<Supervisor> getListOfSupervisors(){
        List<Supervisor> supervisorList = new ArrayList<>();
        supervisorList.add(Supervisor.supervisorBuilder()
                .id(1)
                .firstName("John")
                .lastName("Doe")
                .matricule("1234567")
                .password("password")
                .build());
        supervisorList.add(Supervisor.supervisorBuilder()
                .id(2)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("7654321")
                .password("password")
                .build());
        supervisorList.add(Supervisor.supervisorBuilder()
                .id(3)
                .firstName("Pipo")
                .lastName("Tito")
                .matricule("1234569")
                .password("password")
                .build());
        return supervisorList;
    }
}
