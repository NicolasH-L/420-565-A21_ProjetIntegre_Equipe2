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
}
