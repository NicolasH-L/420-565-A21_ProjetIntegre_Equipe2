package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.service.MonitorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/monitors")
public class MonitorController {

    @Autowired
    private MonitorService monitorService;

    @PostMapping("/register")
    public ResponseEntity<Monitor> subscribe(@RequestBody Monitor monitor) {
        return monitorService.registerMonitor(monitor)
                .map(monitor1 -> ResponseEntity.status(HttpStatus.CREATED).body(monitor1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/monitorEmailExists/{email}")
    public ResponseEntity<Boolean> monitorExistsByEmail(@PathVariable String email) {
        return monitorService.monitorExistsByEmail(email)
                .map(monitor1 -> ResponseEntity.status(HttpStatus.OK).body(monitor1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(false));
    }

    @GetMapping("/{email}/{password}")
    public ResponseEntity<Monitor> getMonitorByEmailAndPassword(@PathVariable String email, @PathVariable String password) {
        return monitorService.loginMonitor(email, password)
                .map(monitor1 -> ResponseEntity.status(HttpStatus.OK).body(monitor1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Monitor()));
    }

    @GetMapping("/get-all-monitors")
    public ResponseEntity<List<Monitor>> getAllMonitors(){
        return monitorService.getAllMonitors()
                .map(monitor1 -> ResponseEntity.status(HttpStatus.OK).body(monitor1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
