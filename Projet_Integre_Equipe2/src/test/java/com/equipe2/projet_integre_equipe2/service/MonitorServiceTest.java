package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
//    @Disabled
    public void testGetAllMonitors() {
        when(monitorService.findAll()).thenReturn(getListMonitors());

        final List<Monitor> monitorList = monitorService.getAllMonitors();

        assertThat(monitorList.size()).isEqualTo(3);
        assertThat(monitorList.get(0).getLastName()).isEqualTo("toto");
    }

    @Test
//    @Disabled
    public void testMonitorExistsByEmail() {
        String email = "toto@toto.toto";
        when(monitorService.isMonitorExistsByEmail(email)).thenReturn(false);
        assertThat(monitorService.isMonitorExistsByEmail(email)).isFalse();
    }

    @Test
//    @Disabled
    public void testRegisterMonitor() {
        Monitor monitor1 = Monitor.monitorBuilder()
                .id(1)
                .password("toto")
                .lastName("toto")
                .firstName("toto")
                .enterpriseName("toto")
                .email("toto@toto")
                .build();
        when(monitorService.isMonitorExistsByEmail(monitor1.getEmail())).thenReturn(true);
        monitorService.registerMonitor(monitor1);
        assertThat(monitorService.isMonitorExistsByEmail(monitor1.getEmail())).isTrue();
    }

    @Test
    public void testRegisterMonitorWithSameEmail(){
        Monitor monitor1 = Monitor.monitorBuilder()
                .id(1)
                .password("toto")
                .lastName("toto")
                .firstName("toto")
                .enterpriseName("toto")
                .email("toto@toto")
                .build();
        Monitor monitor2 = Monitor.monitorBuilder()
                .id(2)
                .password("tata")
                .lastName("tata")
                .firstName("tata")
                .enterpriseName("tata")
                .email("toto@toto")
                .build();
        monitorService.registerMonitor(monitor1);
        monitorService.registerMonitor(monitor2);
        when(monitorService.getMonitorById(monitor2.getId())).thenReturn(null);
        assertThat(monitorService.getMonitorById(monitor2.getId())).isNull();
    }

    @Test
    public void testRegisterMonitorDuplicateId(){
        Monitor monitor1 = Monitor.monitorBuilder()
                .id(1)
                .password("toto")
                .lastName("toto")
                .firstName("toto")
                .enterpriseName("toto")
                .email("toto@toto")
                .build();
        Monitor monitor2 = Monitor.monitorBuilder()
                .id(1)
                .password("tata")
                .lastName("tata")
                .firstName("tata")
                .enterpriseName("tata")
                .email("tota@toto")
                .build();
        monitorService.registerMonitor(monitor1);
        monitorService.registerMonitor(monitor2);
        when(monitorService.isMonitorExistsByEmail(monitor1.getEmail())).thenReturn(true);
        assertThat(monitorService.isMonitorExistsByEmail(monitor1.getEmail())).isTrue();

    }

    @Test
//    @Disabled
    public void testRegisterMonitorDuplicate() {
        String email = "toto@toto.toto";
        Monitor monitor1 = Monitor.monitorBuilder()
                .password("toto")
                .lastName("toto")
                .firstName("toto")
                .enterpriseName("toto")
                .email("toto")
                .build();
        Monitor monitor2 = monitor1;
        when(monitorService.registerMonitor(monitor1)).thenReturn(false);
        monitorService.registerMonitor(monitor2);
        assertThat(monitorService.registerMonitor(monitor1)).isFalse();
    }

    @Test
    public void testGetAMonitorByEmail() {
        Monitor monitor = Monitor.monitorBuilder()
                .id(1)
                .password("qsassssss2@")
                .firstName("ssssssss")
                .lastName("ssssssssss")
                .enterpriseName("ssssssss")
                .email("ssssssss@gmail.com")
                .build();

        monitorService.registerMonitor(monitor);
        when(monitorService.getAMonitorByEmail(monitor)).thenReturn(monitor);

        assertThat(monitorService.getAMonitorByEmail(monitor)).isNotNull();
    }

    @Test
    public void testGetAMonitorByEmailAndPassword(){
        Monitor monitor = Monitor.monitorBuilder()
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


    // To test later
    @Test
    public void testLoginMonitor() {
        List<Monitor> list = getListMonitors();
        String email = "toto@toto.toto";
        String password = "toto";
        Monitor expected = list.get(0);
        when(monitorService.loginMonitor(email, password)).thenReturn(expected);

        assertThat(monitorService.loginMonitor(email, password)).isEqualTo(expected);
    }

    private List<Monitor> getListMonitors() {
        List<Monitor> list = new ArrayList<>();
        list.add(Monitor.monitorBuilder()
                .password("toto")
                .lastName("toto")
                .firstName("toto")
                .enterpriseName("totoEnterprise")
                .email("toto@toto.toto")
                .build());
        list.add(Monitor.monitorBuilder()
                .password("titi")
                .lastName("titi")
                .firstName("titi")
                .enterpriseName("titiEnterprise")
                .email("titi@titi.titi")
                .build());
        list.add(Monitor.monitorBuilder()
                .password("tata")
                .lastName("tata")
                .enterpriseName("tata")
                .email("tata@tata.tata")
                .build());
        return list;
    }
}