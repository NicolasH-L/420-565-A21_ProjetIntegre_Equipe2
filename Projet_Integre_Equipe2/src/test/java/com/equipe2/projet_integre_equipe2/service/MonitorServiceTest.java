package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import com.equipe2.projet_integre_equipe2.security.PasswordService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MonitorServiceTest {

    @Mock
    private MonitorRepository monitorRepository;

    @InjectMocks
    private MonitorService monitorService;

    private Monitor monitor;
    private Monitor monitorRegistered;
    private PasswordService passwordService;
    private String rawPassword = "toto1*";

    @BeforeEach
    void setup() {
        passwordService = new PasswordService();
        String encodedPassword = passwordService.encodePassword(rawPassword);

        monitor = Monitor.monitorBuilder()
                .id(1)
                .password(rawPassword)
                .lastName("toto")
                .firstName("toto")
                .companyName("toto")
                .email("toto@toto.toto")
                .build();

        monitorRegistered = Monitor.monitorBuilder()
                .id(1)
                .password(encodedPassword)
                .lastName("toto")
                .firstName("toto")
                .companyName("toto")
                .email("toto@toto.toto")
                .build();
    }

    @Test
    public void testRegisterMonitor() {
        when(monitorRepository.save(monitor)).thenReturn(monitorRegistered);
        Optional<Monitor> actualMonitor = monitorService.registerMonitor(monitor);
        assertThat(actualMonitor.get()).isEqualTo(monitorRegistered);
    }

    @Test
    public void testRegisterDuplicateMonitorEmailFails() {
        Monitor duplicateEmailMonitor = Monitor.monitorBuilder()
                .id(5)
                .password("tata")
                .lastName("tata")
                .firstName("tata")
                .companyName("tata")
                .email("toto@toto.toto")
                .build();
        when(monitorRepository.save(any())).thenReturn(monitor).thenReturn(Optional.empty());
        Optional<Monitor> actualMonitor = monitorService.registerMonitor(monitor);
        Optional<Monitor> actualDuplicateMonitor = monitorService.registerMonitor(duplicateEmailMonitor);
        assertThat(actualMonitor).isEqualTo(Optional.of(monitor));
        assertThat(actualDuplicateMonitor).isEmpty();
    }

    @Test
    public void testMonitorExistsByEmail() {
        when(monitorRepository.existsByEmailIgnoreCase(monitor.getEmail())).thenReturn(true);
        Optional<Boolean> actualMonitor = monitorService.monitorExistsByEmail(monitor.getEmail());
        assertThat(actualMonitor.get()).isEqualTo(true);
    }

    @Test
    public void testLoginMonitor() {
        when(monitorRepository.findMonitorByEmailIgnoreCase(monitor.getEmail())).thenReturn(monitorRegistered);
        Optional<Monitor> actualMonitor = monitorService.loginMonitor(monitor.getEmail(), monitor.getPassword());
        assertThat(actualMonitor.get()).isEqualTo(monitorRegistered);
    }

    @Test
    public void testVerifyPassword(){
        when(monitorRepository.findMonitorByEmailIgnoreCase(any())).thenReturn(monitorRegistered);
        Optional<Boolean> isPasswordGood = monitorService.verifypassword(monitorRegistered.getEmail(), rawPassword);
        assertThat(isPasswordGood.get()).isTrue();
    }

    @Test
    public void testVerifyPasswordFails(){
        when(monitorRepository.findMonitorByEmailIgnoreCase(any())).thenReturn(null);
        Optional<Boolean> isPasswordGood = monitorService.verifypassword(monitorRegistered.getEmail(), "null");
        assertThat(isPasswordGood).isEmpty();
    }

    @Test
    public void testLoginMonitorFails() {
        when(monitorRepository.findMonitorByEmailIgnoreCase(null)).thenReturn(null);
        Optional<Monitor> actualMonitor = monitorService.loginMonitor(null, null);
        assertThat(actualMonitor).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetAllMonitors() {
        when(monitorRepository.findAll()).thenReturn(getListOfMonitors());
        final Optional<List<Monitor>> allMonitors = monitorService.getAllMonitors();
        assertThat(allMonitors.get().size()).isEqualTo(3);
        assertThat(allMonitors.get().get(0).getEmail()).isEqualTo("didi@kong.com");
    }

    @Test
    public void testGetAllMonitorsFail() {
        when(monitorRepository.findAll()).thenReturn(null);
        final Optional<List<Monitor>> allMonitors = monitorService.getAllMonitors();
        assertThat(allMonitors).isEqualTo(Optional.empty());
    }

    private List<Monitor> getListOfMonitors() {
        List<Monitor> monitorList = new ArrayList<>();
        monitorList.add(Monitor.monitorBuilder()
                .id(2)
                .password("didi1*")
                .lastName("didi")
                .firstName("didi")
                .companyName("kong")
                .email("didi@kong.com")
                .build());
        monitorList.add(Monitor.monitorBuilder()
                .id(3)
                .password("dodo1*")
                .lastName("dodo")
                .firstName("dodo")
                .companyName("kong")
                .email("dodo@kong.com")
                .build());
        monitorList.add(Monitor.monitorBuilder()
                .id(4)
                .password("donkey1*")
                .lastName("donkey")
                .firstName("donkey")
                .companyName("kong")
                .email("donkey@kong.com")
                .build());
        return monitorList;
    }
}