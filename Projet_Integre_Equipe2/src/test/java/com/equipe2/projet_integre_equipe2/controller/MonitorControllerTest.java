package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Monitor;

import com.equipe2.projet_integre_equipe2.model.Student;
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

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MonitorController.class)
class MonitorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MonitorService monitorService;

    @MockBean
    private MonitorRepository monitorRepository;

    private Monitor monitor = Monitor.monitorBuilder()
            .firstName("toto")
            .lastName("toto")
            .email("toto@toto")
            .enterpriseName("toto")
            .password("1234")
            .build();
    private Monitor monitorDuplicateEmail = Monitor.monitorBuilder()
            .firstName("tata")
            .lastName("toto")
            .email("toto@toto")
            .enterpriseName("toto")
            .password("1234")
            .build();
    @Test
    public void registerMonitorTest() throws Exception {
        when(monitorService.registerMonitor(monitor)).thenReturn(Optional.of(monitor));
        MvcResult result = mockMvc.perform(post("/monitors/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(monitor))).andReturn();
        var actualMonitor = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Monitor.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(monitor).isEqualTo(actualMonitor);
    }

    @Test
    public void registerMonitorDuplicateEmailTest() throws Exception {
        when(monitorService.registerMonitor(any())).thenReturn(Optional.of(monitor)).thenReturn(Optional.empty());
        MvcResult result = mockMvc.perform(post("/monitors/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(monitor))).andReturn();
        MvcResult emptyResult = mockMvc.perform(post("/monitors/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(monitorDuplicateEmail))).andReturn();
        var actualMonitor = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Monitor.class);
        Monitor actualDuplicate;
        try {
            actualDuplicate = new ObjectMapper().readValue(emptyResult.getResponse().getContentAsString(), Monitor.class);
        }catch(Exception e){
            System.out.println(e.getMessage());
            actualDuplicate = null;
        }
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(actualMonitor).isEqualTo(monitor);
        assertThat(emptyResult.getResponse().getStatus()).isNotEqualTo(HttpStatus.CREATED.value());
        assertThat(actualDuplicate).isNull();
    }

    @Test
    public void monitorExistsByEmailTest() throws Exception {
        when(monitorService.monitorExistsByEmail(monitor.getEmail())).thenReturn(Optional.of(true));

        MvcResult result = mockMvc.perform(get("/monitors/monitorEmailExists/toto@toto")
                        .contentType(MediaType.APPLICATION_JSON))
                        .andReturn();

        var actualMonitor = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Boolean.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualMonitor).isEqualTo(true);
    }
}