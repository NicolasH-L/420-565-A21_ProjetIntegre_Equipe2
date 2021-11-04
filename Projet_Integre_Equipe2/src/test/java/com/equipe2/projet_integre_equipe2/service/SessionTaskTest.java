package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Mock
    private SessionTask sessionTask;

    @Test
    public void testVerifySession() {

        sessionTask.verifySession();
        verify(sessionTask, times(1)).verifySession();
        
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

    private List<Admin> getListOfAdmin(){
        List<Admin> adminList = new ArrayList<>();
        adminList.add(Admin.adminBuilder()
                .username("admin")
                .password("1234")
                .build());
        adminList.add(Admin.adminBuilder()
                .username("admin2")
                .password("12345")
                .build());
        return adminList;
    }

    private List<Student> getListOfStudents() {
        List<Student> studentList = new ArrayList<>();
        studentList.add(Student.studentBuilder()
                .id(2)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .isCvValid(true)
                .build());
        studentList.add(Student.studentBuilder()
                .id(3)
                .firstName("Lolo")
                .lastName("Lala")
                .matricule("1234568")
                .password("1235")
                .isCvValid(false)
                .build());
        return studentList;
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
        return monitorList;
    }

    private List<Supervisor> getListOfSupervisors(){
        List<Supervisor> supervisorList = new ArrayList<>();
        supervisorList.add(Supervisor.supervisorBuilder()
                .id(1)
                .firstName("John")
                .lastName("Doe")
                .matricule("1234567")
                .password("password")
                .build());
        supervisorList.add(Supervisor.supervisorBuilder()
                .id(2)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("7654321")
                .password("password")
                .build());
        return supervisorList;
    }
}
