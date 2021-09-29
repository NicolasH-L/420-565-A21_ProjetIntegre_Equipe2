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

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

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
        Monitor monitorDuplicate = Monitor.monitorBuilder()
                .firstName("tata")
                .lastName("toto")
                .email("toto@toto")
                .enterpriseName("toto")
                .password("1234")
                .build();
        when(monitorService.registerMonitor(any())).thenReturn(Optional.of(monitor))
//                ;
                .thenReturn(Optional.empty());

        MvcResult result = mockMvc.perform(post("/monitors/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(monitor))).andReturn();

        MvcResult result2 = mockMvc.perform(post("/monitors/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(monitorDuplicate))).andReturn();

        var actualMonitor = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Monitor.class);
        Monitor actualDuplicate;
        try {
            actualDuplicate = new ObjectMapper().readValue(result2.getResponse().getContentAsString(), Monitor.class);
        }catch(Exception e){
            System.out.println(e.getMessage());
            actualDuplicate = null;
        }
        System.out.println(actualDuplicate);

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(actualMonitor).isEqualTo(monitor);
        assertThat(result2.getResponse().getStatus()).isNotEqualTo(HttpStatus.CREATED.value());
        assertThat(actualDuplicate).isNull();
    }
}