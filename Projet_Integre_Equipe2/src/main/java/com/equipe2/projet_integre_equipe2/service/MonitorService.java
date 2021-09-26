package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Data
@Builder
@Service
public class MonitorService {

    public MonitorRepository monitorRepository;

    public MonitorService(MonitorRepository monitorRepository) {
        this.monitorRepository = monitorRepository;
    }

    public Optional<Monitor> registerMonitor(Monitor monitor){
        if (monitorRepository.existsByEmail(monitor.getEmail())){
            return null;
        }
        return Optional.of(monitorRepository.save(monitor));
    }

    public List<Monitor> getAllMonitors() {
        return monitorRepository.findAll();
    }

    public Monitor getAMonitorByEmail(Monitor monitor) {
        return monitorRepository.findMonitorByEmail(monitor);
    }

    public boolean isMonitorExistsByEmail(String email){
        return monitorRepository.existsByEmail(email);
    }

    public Monitor loginMonitor(String email, String password) {
        return monitorRepository.findMonitorByEmailAndPassword(email, password);
    }

    public Monitor getMonitorById(Integer id) {
        return monitorRepository.findMonitorById(id);
    }

    public List<Monitor> findAll() {
        return monitorRepository.findAll();
    }
}
