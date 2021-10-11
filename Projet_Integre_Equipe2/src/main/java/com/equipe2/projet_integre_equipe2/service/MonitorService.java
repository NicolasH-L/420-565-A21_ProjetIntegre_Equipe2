package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MonitorService {

    public MonitorRepository monitorRepository;

    public MonitorService(MonitorRepository monitorRepository) {
        this.monitorRepository = monitorRepository;
    }

    public Optional<Monitor> registerMonitor(Monitor monitor) {
        try {
            return Optional.of(monitorRepository.save(monitor));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public Optional<Monitor> loginMonitor(String email, String password) {
        try {
            return Optional.of(monitorRepository.findMonitorByEmailIgnoreCaseAndPassword(email, password));
        } catch(Exception exception){
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
