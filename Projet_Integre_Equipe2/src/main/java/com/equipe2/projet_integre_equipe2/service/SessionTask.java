package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
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

    private List<Admin> adminList;
    private List<String> sessions;

    @Autowired
    private AdminService adminService;

    @Scheduled(cron = "0 0 0 1 * *")
    public void verifySession() {
        adminList = adminService.getAllAdmin().get();
        LocalDate date = LocalDate.now();
        String month = formatDate(date, MONTH_PATTERN);
        month = calculateMonth(Integer.parseInt(month));
        String year = formatDate(date, YEAR_PATTERN);
        year = calculateYear(Integer.parseInt(month), Integer.parseInt(year));
        String calculatedSession = calculateSession(Integer.parseInt(month), year);

        for (int i = 0; i < adminList.size(); i++){
            sessions = adminList.get(i).getSessions();
            if (sessions.size() == 0 || !sessions.get(sessions.size() - 1).equals(calculatedSession)){
                Admin admin = adminList.get(i);
                List<String> tempSession = admin.getSessions();
                tempSession.add(calculatedSession);
                admin.setActualSession(calculatedSession);
                adminService.saveAdmin(admin);
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
