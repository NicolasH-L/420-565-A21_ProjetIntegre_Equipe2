package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class SessionTask{

    private final String[] SESSION_PREFIX = {"winter", "summer"};
    private final int LAST_MONTH_OF_THE_YEAR = 12;
    private final int WINTER_START = 9;
    private final int WINTER_DEADLINE = 2;
    private final int SUMMER_START = 3;
    private final int SUMMER_DEADlINE = 6;
    private final String MONTH_PATTERN = "MM";
    private final String YEAR_PATTERN = "yyyy";

    private AdminService adminService;
    private StudentService studentService;
    private MonitorService monitorService;
    private SupervisorService supervisorService;
    private SessionsService sessionsService;

    private List<Admin> adminList;
    private List<Student> studentList;
    private List<Monitor> monitorList;
    private List<Supervisor> supervisorList;
    private List<Sessions> sessionsList;

    private SessionDateCalculator sessionDateCalculator;
    private SessionVerification sessionVerification;

    public SessionTask(AdminService adminService, StudentService studentService,
                       MonitorService monitorService, SupervisorService supervisorService,
                       SessionsService sessionsService){
        this.adminService = adminService;
        this.studentService = studentService;
        this.monitorService = monitorService;
        this.supervisorService = supervisorService;
        this.sessionsService = sessionsService;
    }

    @Scheduled(cron = "0 0 0 1 * *")
    public void verifySession() {
        sessionDateCalculator = new SessionDateCalculator(LocalDate.now(), MONTH_PATTERN, YEAR_PATTERN,
                                                        SESSION_PREFIX, LAST_MONTH_OF_THE_YEAR, WINTER_START,
                                                        WINTER_DEADLINE, SUMMER_START, SUMMER_DEADlINE);
        sessionVerification = new SessionVerification();
        sessionsList = sessionsService.getAllSessions().get();
        adminList = adminService.getAllAdmin().get();
        studentList = studentService.getAllStudents().get();
        monitorList = monitorService.getAllMonitors().get();
        supervisorList = supervisorService.getAllSupervisors().get();
        String calculatedSession = sessionDateCalculator.calculateSession();

        setSessionList(calculatedSession, sessionsList, sessionVerification);

        if (adminList.size() > 0){
            for (Admin admin : adminList) {
                setAdminSession(calculatedSession, admin, sessionVerification);
            }
        }

        if (studentList.size() > 0){
            for (Student student : studentList) {
                setStudentSession(calculatedSession, student, sessionVerification);
            }
        }

        if (monitorList.size() > 0){
            for (Monitor monitor : monitorList) {
                setMonitorSession(calculatedSession, monitor, sessionVerification);
            }
        }

        if (supervisorList.size() > 0){
            for (Supervisor supervisor : supervisorList) {
                setSupervisorSession(calculatedSession, supervisor, sessionVerification);
            }
        }
    }

    public Sessions setSessionList(String calculatedSession, List<Sessions> sessionsList, SessionVerification sessionVerification) {
        if (sessionsList.size() > 0){
            if (sessionVerification.verifySessionsListIsUpToDate(calculatedSession, sessionsList)){
                return null;
            }
        }
        Sessions session = new Sessions();
        session.setSession(calculatedSession);
        return sessionsService.saveSession(session).get();
    }

    public Admin setAdminSession(String calculatedSession, Admin admin, SessionVerification sessionVerification) {
        if (!sessionVerification.verifySessionForAdminsIsUpToDate(calculatedSession, admin)){
            admin.setActualSession(calculatedSession);
            return adminService.saveAdmin(admin).get();
        }
        return null;
    }

    public Student setStudentSession(String calculatedSession, Student student, SessionVerification sessionVerification) {
        if (!sessionVerification.verifySessionForStudentsIsUpToDate(calculatedSession, student)){
            student.setActualSession(calculatedSession);
            return studentService.registerStudent(student).get();
        }
        return null;
    }

    public Monitor setMonitorSession(String calculatedSession, Monitor monitor, SessionVerification sessionVerification) {
        if (!sessionVerification.verifySessionForMonitorsIsUpToDate(calculatedSession, monitor)){
            monitor.setActualSession(calculatedSession);
            return monitorService.registerMonitor(monitor).get();
        }
        return null;
    }

    public Supervisor setSupervisorSession(String calculatedSession, Supervisor supervisor, SessionVerification sessionVerification) {
        if (!sessionVerification.verifySessionForSupervisorsIsUpToDate(calculatedSession, supervisor)){
            supervisor.setActualSession(calculatedSession);
            return supervisorService.registerSupervisor(supervisor).get();
        }
        return null;
    }
}
