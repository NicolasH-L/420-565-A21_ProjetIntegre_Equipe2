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
        adminList = adminService.getAllAdmin().get();
        studentList = studentService.getAllStudents().get();
        monitorList = monitorService.getAllMonitors().get();
        supervisorList = supervisorService.getAllSupervisors().get();
        sessionsList = sessionsService.getAllSessions().get();
        String calculatedSession = sessionDateCalculator.calculateSession();

        if (sessionVerification.verifySessionsListIsUpToDate(calculatedSession, sessionsList)){
            Sessions session = new Sessions();
            session.setSession(calculatedSession);
            sessionsService.saveSession(session);
        }

        for (Admin admin : adminList) {
            if (!sessionVerification.verifySessionForAdminsIsUpToDate(calculatedSession, admin)){
                admin.setActualSession(calculatedSession);
                adminService.saveAdmin(admin);
            }
        }

        for (Student student : studentList) {
            if (sessionVerification.verifySessionForStudentsIsUpToDate(calculatedSession, student)){
                student.setActualSession(calculatedSession);
                studentService.registerStudent(student);
            }
        }

        for (Monitor monitor : monitorList) {
            if (sessionVerification.verifySessionForMonitorsIsUpToDate(calculatedSession, monitor)){
                monitor.setActualSession(calculatedSession);
                monitorService.registerMonitor(monitor);
            }
        }

        for (Supervisor supervisor : supervisorList) {
            if (sessionVerification.verifySessionForSupervisorsIsUpToDate(calculatedSession, supervisor)){
                supervisor.setActualSession(calculatedSession);
                supervisorService.registerSupervisor(supervisor);
            }
        }
    }
}
