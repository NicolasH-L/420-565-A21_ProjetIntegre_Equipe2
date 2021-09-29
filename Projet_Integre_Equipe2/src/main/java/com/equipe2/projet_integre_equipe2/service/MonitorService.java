package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Data
@Service
public class MonitorService {

    public MonitorRepository monitorRepository;

    public MonitorService(MonitorRepository monitorRepository) {
        this.monitorRepository = monitorRepository;
    }

    public Optional<Monitor> registerMonitor(Monitor monitor) {
        try {
            return Optional.of(monitorRepository.save(monitor));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Monitor getAMonitorByEmail(Monitor monitor) {
        return monitorRepository.findMonitorByEmail(monitor.getEmail());
    }

    public Monitor loginMonitor(String email, String password) {
        return monitorRepository.findMonitorByEmailAndPassword(email, password);
    }
}
