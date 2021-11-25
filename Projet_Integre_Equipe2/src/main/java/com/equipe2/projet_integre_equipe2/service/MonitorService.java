package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import com.equipe2.projet_integre_equipe2.security.PasswordService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MonitorService {

    public MonitorRepository monitorRepository;
    private PasswordService passwordService;

    public MonitorService(MonitorRepository monitorRepository) {
        this.monitorRepository = monitorRepository;
        this.passwordService = new PasswordService();
    }

    public Optional<Monitor> registerMonitor(Monitor monitor) {
        try {
            if (monitor.getPassword().length() <= 16)
                    monitor.setPassword(passwordService.encodePassword(monitor.getPassword()));
            return Optional.of(monitorRepository.save(monitor));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public Optional<Monitor> loginMonitor(String email, String password) {
        try {
            Monitor monitor = monitorRepository.findMonitorByEmailIgnoreCase(email);
            return passwordService.matchPassword(password, monitor.getPassword()) ? Optional.of(monitor) : Optional.empty();
        } catch(Exception exception){
            return Optional.empty();
        }
    }

    public Optional<Boolean> verifypassword(String email, String pwd) {
        try {
            Monitor monitor = monitorRepository.findMonitorByEmailIgnoreCase(email);
            return Optional.of(passwordService.matchPassword(pwd, monitor.getPassword()));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public Optional<Boolean> monitorExistsByEmail(String email){
        return Optional.of(monitorRepository.existsByEmailIgnoreCase(email));
    }

    public Optional<List<Monitor>> getAllMonitors() {
        try {
            return Optional.of(monitorRepository.findAll());
        } catch (Exception exception) {
            return Optional.empty();
        }
    }
}
