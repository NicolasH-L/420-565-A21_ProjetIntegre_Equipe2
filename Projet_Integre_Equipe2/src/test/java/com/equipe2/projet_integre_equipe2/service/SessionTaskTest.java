package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SessionTaskTest {

    @Mock
    private SessionsService sessionsService;

    @Mock
    private AdminService adminService;

    @Mock
    private StudentService studentService;

    @Mock
    private MonitorService monitorService;

    @Mock
    private SupervisorService supervisorService;

    private SessionVerification sessionVerification = new SessionVerification();

    private SessionTask sessionTask2 = new SessionTask(adminService, studentService, monitorService, supervisorService, sessionsService);

    @InjectMocks
    private SessionTask sessionTask;

    private Sessions session;
    private Admin admin;
    private Student student;
    private Monitor monitor;
    private Supervisor supervisor;

    @BeforeEach
    void setup(){
        session = Sessions.builder()
                .session("winter2022")
                .build();

        admin = Admin.adminBuilder()
                .id(1)
                .username("username")
                .password("password")
                .actualSession("winter2022")
                .build();

        student = Student.studentBuilder()
                .id(1)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .isCvValid(true)
                .actualSession("winter2022")
                .build();

        monitor = Monitor.monitorBuilder()
                .id(1)
                .password("toto")
                .lastName("toto")
                .firstName("toto")
                .companyName("toto")
                .email("toto@toto.toto")
                .actualSession("winter2022")
                .build();

        supervisor = Supervisor.supervisorBuilder()
                .id(1)
                .firstName("toto")
                .lastName("toto")
                .matricule("1234567")
                .password("toto1!")
                .actualSession("winter2022")
                .build();
    }

//    @Test
//    public void testSessionTaskConstructor(){
//        SessionTask newSessionTask = new SessionTask(adminService, studentService, monitorService, supervisorService, sessionsService);
//        assertThat(newSessionTask.getAdminService()).isEqualTo(sessionTask.getAdminService());
//        assertThat(newSessionTask.getStudentService()).isEqualTo(sessionTask.getStudentService());
//        assertThat(newSessionTask.getMonitorService()).isEqualTo(sessionTask.getMonitorService());
//        assertThat(newSessionTask.getSupervisorService()).isEqualTo(sessionTask.getSupervisorService());
//        assertThat(newSessionTask.getSessionsService()).isEqualTo(sessionTask.getSessionsService());
//    }

    @Test
    public void testSetSessionList(){
        when(sessionsService.saveSession(session)).thenReturn(Optional.of(session));
        assertThat(sessionTask.setSessionList("winter2022", getListOfSessions(), sessionVerification)).isEqualTo(session);
    }

    @Test
    public void testSetSessionListFails(){
        assertThat(sessionTask.setSessionList("summer2022", getListOfSessions(), sessionVerification)).isNull();
    }

    @Test
    public void testSetAdminSession(){
        when(adminService.saveAdmin(admin)).thenReturn(Optional.of(admin));
        assertThat(sessionTask.setAdminSession("summer2022", admin, sessionVerification)).isEqualTo(admin);
    }

    @Test
    public void testSetAdminSessionFails(){
        assertThat(sessionTask.setAdminSession("winter2022", admin, sessionVerification)).isNull();
    }

    @Test
    public void testSetStudentSession(){
        when(studentService.registerStudent(student)).thenReturn(Optional.of(student));
        assertThat(sessionTask.setStudentSession("summer2022", student, sessionVerification)).isEqualTo(student);
    }

    @Test
    public void testSetStudentSessionFails(){
        assertThat(sessionTask.setStudentSession("winter2022", student, sessionVerification)).isNull();
    }

    @Test
    public void testSetMonitorSession(){
        when(monitorService.registerMonitor(monitor)).thenReturn(Optional.of(monitor));
        assertThat(sessionTask.setMonitorSession("summer2022", monitor, sessionVerification)).isEqualTo(monitor);
    }

    @Test
    public void testSetMonitorSessionFails(){
        assertThat(sessionTask.setMonitorSession("winter2022", monitor, sessionVerification)).isNull();
    }

    @Test
    public void testSetSupervisorSession(){
        when(supervisorService.registerSupervisor(supervisor)).thenReturn(Optional.of(supervisor));
        assertThat(sessionTask.setSupervisorSession("summer2022", supervisor, sessionVerification)).isEqualTo(supervisor);
    }

    @Test
    public void testSetSupervisorSessionFails(){
        assertThat(sessionTask.setSupervisorSession("winter2022", supervisor, sessionVerification)).isNull();
    }

    private List<Sessions> getListOfSessions(){
        List<Sessions> sessionsList = new ArrayList<>();
        sessionsList.add(Sessions.builder()
                .idSession(1)
                .session("winter2022")
                .build());
        sessionsList.add(Sessions.builder()
                .idSession(2)
                .session("summer2022")
                .build());

        return sessionsList;
    }
}
