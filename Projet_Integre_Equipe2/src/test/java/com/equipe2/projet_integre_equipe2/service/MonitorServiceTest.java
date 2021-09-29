package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class MonitorServiceTest {

    @Mock
    private MonitorRepository monitorRepository;

    @InjectMocks
    private MonitorService monitorService;

    private Monitor monitor = Monitor.monitorBuilder()
            .password("toto")
                .lastName("toto")
                .firstName("toto")
                .enterpriseName("toto")
                .email("toto@toto.toto")
                .build();

    @Test
    public void testRegisterMonitor() {
        when(monitorRepository.save(monitor)).thenReturn(monitor);
        Optional<Monitor> actualMonitor = monitorService.registerMonitor(monitor);
        assertThat(actualMonitor.get()).isEqualTo(monitor);
    }

    @Test
    public void testRegisterDuplicateMonitorEmailFails(){
        Monitor duplicateEmailMonitor = Monitor.monitorBuilder()
                .password("tata")
                .lastName("tata")
                .firstName("tata")
                .enterpriseName("tata")
                .email("toto@toto.toto")
                .build();
        when(monitorRepository.save(any())).thenReturn(monitor).thenReturn(Optional.empty());
        Optional<Monitor> actualMonitor = monitorService.registerMonitor(monitor);
        Optional<Monitor> actualDuplicateMonitor = monitorService.registerMonitor(duplicateEmailMonitor);
        assertThat(actualMonitor).isEqualTo(Optional.of(monitor));
        assertThat(actualDuplicateMonitor).isEmpty();
    }


}