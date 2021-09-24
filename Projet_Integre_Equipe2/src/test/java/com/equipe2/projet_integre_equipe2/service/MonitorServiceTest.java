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

import static org.assertj.core.api.Assertions.setMaxElementsForPrinting;
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

    @Test
    public void testRegisterMonitor() {
        String email = "toto@toto.toto";
        Monitor newMonitor = Monitor.builder()
                .password("toto")
                .lastName("toto")
                .firstName("toto")
                .enterpriseName("toto")
                .email("toto")
                .build();
        when(monitorService.registerMonitor(newMonitor)).thenReturn(true);

        assertThat(monitorService.registerMonitor(newMonitor)).isTrue();
    }

    @Test
    public void testLoginMonitor() {
        List<Monitor> list = getListMonitors();
        String email = "toto@toto.toto";
        String password = "toto";
        Monitor expected = list.get(0);
        when(monitorService.loginMonitor(email, password)).thenReturn(expected);

        assertThat(monitorService.loginMonitor(email, password)).isEqualTo(expected);
    }

    @Test
    public void testGetAMonitorByEmail() {
        Monitor monitor = Monitor.builder()
                .password("qsassssss2@")
                .firstName("ssssssss")
                .lastName("ssssssssss")
                .enterpriseName("ssssssss")
                .email("ssssssss@gmail.com")
                .build();

        monitorRepository.save(monitor);
        when(monitorService.getAMonitorByEmail(monitor)).thenReturn(monitor);

        assertThat(monitorService.getAMonitorByEmail(monitor)).isNotNull();
        System.out.println(monitorService.getMonitorById(monitor));
    }

    @Test
    public void testGetAMonitorByEmailAndPassword(){
        Monitor monitor = Monitor.builder()
                .id(34)
                .password("qwerty123@")
                .firstName("qweqwe")
                .lastName("qweqwe")
                .enterpriseName("qweqwe")
                .email("qweqwe@gmail.com")
                .build();

        monitorRepository.save(monitor);
        when(monitorService.loginMonitor(monitor.getEmail(), monitor.getPassword())).thenReturn(monitor);
        assertThat(monitorService.loginMonitor(monitor.getEmail(), monitor.getPassword())).isNotNull();
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