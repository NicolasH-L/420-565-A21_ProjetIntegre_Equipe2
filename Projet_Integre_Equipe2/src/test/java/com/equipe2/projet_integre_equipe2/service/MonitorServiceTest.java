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
        when(monitorRepository.findAll()).thenReturn(getListOfMonitors());

        final List<Monitor> allMonitors = monitorService.getAllMonitors();

        assertThat(allMonitors.size()).isEqualTo(2);
        assertThat(allMonitors.get(0).getEnterpriseName()).isEqualTo("Entreprise");
    }

    private List<Monitor> getListOfMonitors() {
        List<Monitor> monitorList = new ArrayList<>();
        monitorList.add(Monitor.builder()
                .id(1)
                .password("MonPass12@")
                .firstName("Bob")
                .lastName("Bobby")
                .enterpriseName("Entreprise")
                .email("sdkjfhfk@gmail.com")
                .build());
        monitorList.add(Monitor.builder()
                .id(2)
                .password("Pass12@")
                .firstName("test")
                .lastName("tester")
                .enterpriseName("sdfsdfdsfsf")
                .email("ddddfdfdf@gmail.com")
                .build());
        return monitorList;
    }
}