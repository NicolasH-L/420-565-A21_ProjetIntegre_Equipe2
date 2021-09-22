package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@Builder
@Service
public class MonitorService {

    private MonitorRepository monitorRepository;


    public List<Monitor> getAllMonitors() {
        return monitorRepository.findAll();
    }

    public boolean registerMonitor(Monitor newMonitor) {
        monitorRepository.save(newMonitor);
        return monitorRepository.existsById(newMonitor.getId());

    }

    public Monitor loginMonitor(String email, String password) {
        return monitorRepository.findMonitorByEmailAndPassword(email, password);
    }
}
