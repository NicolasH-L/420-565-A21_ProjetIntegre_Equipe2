package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Sessions;
import com.equipe2.projet_integre_equipe2.service.SessionsService;
import com.fasterxml.jackson.databind.ObjectMapper;
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

@WebMvcTest(SessionsController.class)
public class SessionsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SessionsService sessionsService;

    @Test
    public void getAllSessionsTest() throws Exception {
        List<Sessions> sessionsList = getListOfSessions();
        when(sessionsService.getAllSessions()).thenReturn(Optional.of(sessionsList));

        MvcResult result = mockMvc.perform(get("/sessions/get-all-sessions")
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(2);
    }

    private List<Sessions> getListOfSessions(){
        List<Sessions> sessionsList = new ArrayList<>();
        sessionsList.add(Sessions.builder()
                .idSession(1)
                .session("winter2022")
                .build());
        sessionsList.add(Sessions.builder()
                .idSession(2)
                .session("summer2022")
                .build());

        return sessionsList;
    }
}
