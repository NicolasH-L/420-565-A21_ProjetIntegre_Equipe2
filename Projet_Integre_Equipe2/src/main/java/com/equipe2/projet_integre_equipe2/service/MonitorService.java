package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MonitorService {

    public MonitorRepository monitorRepository;

    public MonitorService(MonitorRepository monitorRepository) {this.monitorRepository = monitorRepository;}

    public List<Monitor> getAllMonitors() {return monitorRepository.findAll();}

    public Monitor subscribe(Monitor monitor) {return monitorRepository.save(monitor);}
}
