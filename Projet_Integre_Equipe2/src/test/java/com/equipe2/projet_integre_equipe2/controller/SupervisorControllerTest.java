package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Supervisor;
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

    @BeforeEach
    void setup() {
        supervisor = Supervisor.supervisorBuilder()
                .firstName("toto")
                .lastName("toto")
                .matricule("1234567")
                .password("toto1!")
                .build();
    }

    @Test
    public void subscribeSupervisorTest() throws Exception {
        when(supervisorService.registerSupervisor(supervisor)).thenReturn(Optional.of(supervisor));

        MvcResult result = mockMvc.perform(post("/supervisors/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(supervisor))).andReturn();

        var actualSupervisor = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Supervisor.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(supervisor).isEqualTo(actualSupervisor);
    }

    @Test
    public void loginSupervisorTest() throws Exception {
        when(supervisorService.loginSupervisor(supervisor.getMatricule(), supervisor.getPassword())).thenReturn(Optional.of(supervisor));

        MvcResult result = mockMvc.perform(get("/supervisors/1234567/toto1!")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actualStudent = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Supervisor.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualStudent).isEqualTo(supervisor);
    }
}
