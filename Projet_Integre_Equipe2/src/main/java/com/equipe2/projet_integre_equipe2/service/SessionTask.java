package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Component
public class SessionTask{
    private final String[] SESSION_PREFIX = {"winter", "summer"};
    private final int LAST_MONTH_OH_THE_YEAR = 12;
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
        sessionsList = sessionsService.getAllSessions().get();
        LocalDate date = LocalDate.now();
        String month = formatDate(date, MONTH_PATTERN);
        month = calculateMonth(Integer.parseInt(month));
        String year = formatDate(date, YEAR_PATTERN);
        year = calculateYear(Integer.parseInt(month), Integer.parseInt(year));
        String calculatedSession = calculateSession(Integer.parseInt(month), year);

        verifySessionsList(calculatedSession);
        verifySessionForAdmins(calculatedSession);
        verifySessionForStudents(calculatedSession);
        verifySessionForMonitors(calculatedSession);
        verifySessionForSupervisors(calculatedSession);
    }

    private void verifySessionsList(String calculatedSession) {
        sessionsList = sessionsService.getAllSessions().get();
        if (!sessionsList.get(sessionsList.size() - 1).equals(calculatedSession)){
            Sessions session = new Sessions();
            session.setSession(calculatedSession);
            sessionsService.saveSession(session);
        }
    }

    private void verifySessionForAdmins(String calculatedSession) {
        adminList = adminService.getAllAdmin().get();
        for (int i = 0; i < adminList.size(); i++){
            Admin admin = adminList.get(i);
            if (!admin.getActualSession().equals(calculatedSession)){
                admin.setActualSession(calculatedSession);
                adminService.saveAdmin(admin);
            }
        }
    }

    private void verifySessionForStudents(String calculatedSession) {
        studentList = studentService.getAllStudents().get();
        for (int i = 0; i < studentList.size(); i++){
            Student student = studentList.get(i);
            if (!student.getActualSession().equals(calculatedSession)){
                student.setActualSession(calculatedSession);
                studentService.registerStudent(student);
            }
        }
    }

    private void verifySessionForMonitors(String calculatedSession) {
        monitorList = monitorService.getAllMonitors().get();
        for (int i = 0; i < monitorList.size(); i++){
            Monitor monitor = monitorList.get(i);
            if (!monitor.getActualSession().equals(calculatedSession)){
                monitor.setActualSession(calculatedSession);
                monitorService.registerMonitor(monitor);
            }
        }
    }

    private void verifySessionForSupervisors(String calculatedSession) {
        supervisorList = supervisorService.getAllSupervisors().get();
        for (int i = 0; i < supervisorList.size(); i++){
            Supervisor supervisor = supervisorList.get(i);
            if (!supervisor.getActualSession().equals(calculatedSession)){
                supervisor.setActualSession(calculatedSession);
                supervisorService.registerSupervisor(supervisor);
            }
        }
    }

    private String formatDate(LocalDate date, String pattern){
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern(pattern);
        String formattedDate = date.format(myFormatObj);
        return formattedDate;
    }

    private String calculateMonth(int month){
        return month <= WINTER_DEADLINE ? String.valueOf(LAST_MONTH_OH_THE_YEAR) : String.valueOf(month);
    }

    private String calculateYear(int month, int year){
        return month >= WINTER_START && month <= LAST_MONTH_OH_THE_YEAR
                ? String.valueOf(year + 1) : String.valueOf(year);
    }

    private String calculateSession(int month, String year){
        return month >= WINTER_START && month <= LAST_MONTH_OH_THE_YEAR
                ? SESSION_PREFIX[0] + year
                : month >= SUMMER_START && month <= SUMMER_DEADlINE
                ? SESSION_PREFIX[1] + year : "Erreur";
    }
}
