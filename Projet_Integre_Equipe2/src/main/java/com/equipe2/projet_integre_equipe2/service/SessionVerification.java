package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.*;

import java.util.List;

public class SessionVerification {

    public boolean verifySessionsListIsUpToDate(String calculatedSession, List<Sessions> sessionsList) {
        return sessionsList.get(sessionsList.size() - 1).getSession().equals(calculatedSession);
    }

    public boolean verifySessionForAdminsIsUpToDate(String calculatedSession, Admin admin) {
            return admin.getActualSession().equals(calculatedSession);
    }

    public boolean verifySessionForStudentsIsUpToDate(String calculatedSession, Student student) {
            return student.getActualSession().equals(calculatedSession);
    }

    public boolean verifySessionForMonitorsIsUpToDate(String calculatedSession, Monitor monitor) {
            return monitor.getActualSession().equals(calculatedSession);
    }

    public boolean verifySessionForSupervisorsIsUpToDate(String calculatedSession, Supervisor supervisor) {
            return supervisor.getActualSession().equals(calculatedSession);
    }
}
