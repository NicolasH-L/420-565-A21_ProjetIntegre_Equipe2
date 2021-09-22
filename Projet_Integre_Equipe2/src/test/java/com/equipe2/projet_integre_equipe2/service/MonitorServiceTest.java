package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;


@ExtendWith(MockitoExtension.class)
class MonitorServiceTest {

    @Mock
    private MonitorRepository monitorRepository;

    @InjectMocks
    private MonitorService monitorService;

    @Test
    public void testGetAllMonitors() {
        when(monitorRepository.findAll()).thenReturn(getListMonitors());

        final List<Monitor> monitorList = monitorService.getAllMonitors();

        assertThat(monitorList.size()).isEqualTo(3);
        assertThat(monitorList.get(0).getLastName()).isEqualTo("toto");
        
    }

    private List<Monitor> getListMonitors() {
        List<Monitor> list = new ArrayList<>();
        list.add(Monitor.builder()
                .password("toto")
                .lastName("toto")
                .firstName("toto")
                .enterpriseName("totoEnterprise")
                .email("toto@toto.toto")
                .build());
        list.add(Monitor.builder()
                .password("titi")
                .lastName("titi")
                .firstName("titi")
                .enterpriseName("titiEnterprise")
                .email("titi@titi.titi")
                .build());
        list.add(Monitor.builder()
                .password("tata")
                .lastName("tata")
                .enterpriseName("tata")
                .email("tata@tata.tata")
                .build());
        return list;
    }
}