package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;


@ExtendWith(MockitoExtension.class)
class MonitorServiceTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private MonitorRepository monitorRepository;

    @InjectMocks
    private MonitorService monitorService;

    private Monitor monitor;

    @Test
    public void testGetAllMonitors() {
        when(monitorRepository.findAll()).thenReturn(getListOfMonitors());

        final List<Monitor> allMonitors = monitorService.getAllMonitors();

        assertThat(allMonitors.size()).isEqualTo(2);
        assertThat(allMonitors.get(0).getEnterpriseName()).isEqualTo("Entreprise");
    }

    @Test
    public void testSaveAMonitor() throws Exception {
        monitor = Monitor.builder()
                .id(5)
                .password("qwerty12@")
                .firstName("ererter")
                .lastName("fgdfgdf")
                .enterpriseName("uuiuiu")
                .email("kbjfdsk@gmail.com")
                .build();

        when(monitorService.registerMonitor(monitor)).thenReturn(true);
        assertThat(monitorService.registerMonitor(monitor)).isTrue();
    }

    @Test
    public void testGetAMonitorByEmail() {
        monitor = Monitor.builder()
                .id(54)
                .password("qsassssss2@")
                .firstName("ssssssss")
                .lastName("ssssssssss")
                .enterpriseName("ssssssss")
                .email("ssssssss@gmail.com")
                .build();

        monitorRepository.save(monitor);
        when(monitorService.getAMonitorByEmail(monitor)).thenReturn(monitor);

        assertThat(monitorService.getAMonitorByEmail(monitor)).isNotNull();
    }

    @Test
    public void testGetMonitorById() {
        monitor = Monitor.builder()
                .id(54)
                .password("qqqqqqq2@")
                .firstName("qqqqqq")
                .lastName("qqqqqq")
                .enterpriseName("qqqqqq")
                .email("qqqqqq@gmail.com")
                .build();

        monitorRepository.save(monitor);
        when(monitorService.getMonitorById(monitor)).thenReturn(monitor);

        assertThat(monitorService.getMonitorById(monitor)).isNotNull();
        System.out.println(monitorService.getMonitorById(monitor));
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