package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Monitor;

import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import com.equipe2.projet_integre_equipe2.service.MonitorService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultMatcher;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.internal.bytebuddy.matcher.ElementMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MonitorController.class)
class MonitorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MonitorService monitorService;

    @MockBean
    private MonitorRepository monitorRepository;

    private Monitor expected;

    @Test
    public void subscribeMonitorTest() throws Exception {
        expected = Monitor.monitorBuilder()
                .firstName("toto")
                .lastName("toto")
                .email("toto@toto")
                .enterpriseName("toto")
                .password("1234")
                .build();
        when(monitorService.registerMonitor(expected)).thenReturn(Optional.of(expected));

        MvcResult result = mockMvc.perform(post("/monitors/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(expected))).andReturn();

        var actualMonitor = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Monitor.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(expected).isEqualTo(actualMonitor);
    }

    @Test
    public void testLoginMonitor() throws Exception {
        expected = Monitor.monitorBuilder()
                .firstName("toto")
                .lastName("toto")
                .email("toto@toto")
                .enterpriseName("toto")
                .password("1234")
                .build();

        monitorService.registerMonitor(expected);
        when(monitorService.loginMonitor(expected.getEmail(), expected.getPassword())).thenReturn(expected);

        MvcResult result = (MvcResult) mockMvc.perform(get("/monitors/email/password")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
//                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
//                .andExpect((ResultMatcher) jsonPath("$.email", is(expected.getEmail())))
//                .andExpect((ResultMatcher) jsonPath("$.password", is(expected.getPassword())));
    }
}