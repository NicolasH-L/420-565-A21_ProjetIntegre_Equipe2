package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import com.equipe2.projet_integre_equipe2.service.MonitorService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MonitorController {

    @Autowired
    private MonitorRepository monitorRepository;

    @Autowired
    private MonitorService monitorService;

    public MonitorController(MonitorRepository monitorRepository) {
        this.monitorRepository = monitorRepository;
    }

    @GetMapping
    public List<Monitor> getMonitors() {
        return monitorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Monitor getMonitor(@PathVariable int id) {
        return monitorRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping("monitors/register")
    public Monitor subscribe(@RequestBody Monitor monitor){
        return monitorService.registerMonitor(monitor);
    }
}
