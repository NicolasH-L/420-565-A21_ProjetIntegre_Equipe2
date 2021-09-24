package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/monitors")
public class MonitorController {

    private final MonitorRepository monitorRepository;

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

    @PostMapping
    public ResponseEntity<Monitor> createMonitor(@RequestBody Monitor monitor) throws URISyntaxException {
        Monitor savedMonitor = monitorRepository.save(monitor);
        return ResponseEntity.created(new URI("/monitors/" + savedMonitor.getId())).body(savedMonitor);
    }
}
