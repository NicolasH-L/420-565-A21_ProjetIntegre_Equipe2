package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class SessionVerificationTest {

    private SessionVerification sessionVerification = new SessionVerification();

    private String calculatedSession;
    private String calculatedSession2;
    private Admin admin;
    private Student student;
    private Monitor monitor;
    private Supervisor supervisor;

    @BeforeEach
    void setup() {
        calculatedSession = "winter2022";
        calculatedSession2 = "summer2022";

        admin = Admin.adminBuilder()
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

    @Test
    public void testVerifySessionsListIsUpToDate(){
        assertThat(sessionVerification.verifySessionsListIsUpToDate(calculatedSession, getListOfSessions())).isFalse();
        assertThat(sessionVerification.verifySessionsListIsUpToDate(calculatedSession2, getListOfSessions())).isTrue();
    }

    @Test
    public void testVerifySessionForAdminsIsUpToDate(){
        assertThat(sessionVerification.verifySessionForAdminsIsUpToDate(calculatedSession, admin)).isTrue();
        assertThat(sessionVerification.verifySessionForAdminsIsUpToDate(calculatedSession2, admin)).isFalse();
    }

    @Test
    public void testVerifySessionForStudentsIsUpToDate(){
        assertThat(sessionVerification.verifySessionForStudentsIsUpToDate(calculatedSession, student)).isTrue();
        assertThat(sessionVerification.verifySessionForStudentsIsUpToDate(calculatedSession2, student)).isFalse();
    }

    @Test
    public void testVerifySessionForMonitorsIsUpToDate(){
        assertThat(sessionVerification.verifySessionForMonitorsIsUpToDate(calculatedSession, monitor)).isTrue();
        assertThat(sessionVerification.verifySessionForMonitorsIsUpToDate(calculatedSession2, monitor)).isFalse();
    }

    @Test
    public void testVerifySessionForSupervisorsIsUpToDate(){
        assertThat(sessionVerification.verifySessionForSupervisorsIsUpToDate(calculatedSession, supervisor)).isTrue();
        assertThat(sessionVerification.verifySessionForSupervisorsIsUpToDate(calculatedSession2, supervisor)).isFalse();
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
