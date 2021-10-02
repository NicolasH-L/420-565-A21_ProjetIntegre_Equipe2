package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Supervisor;
import com.equipe2.projet_integre_equipe2.service.SupervisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/supervisors")
@CrossOrigin("http://localhost:3000")
public class SupervisorController {

    @Autowired
    SupervisorService supervisorService;

    @PostMapping("/register")
    public ResponseEntity<Supervisor> subscribe(@RequestBody Supervisor supervisor) {
        return supervisorService.registerSupervisor(supervisor)
                .map(supervisor1 -> ResponseEntity.status(HttpStatus.CREATED).body(supervisor1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/{matricule}/{password}")
    public ResponseEntity<Supervisor> loginSupervisor(@PathVariable String matricule, @PathVariable String password){
        return supervisorService.loginSupervisor(matricule, password)
                .map(supervisor1 -> ResponseEntity.status(HttpStatus.OK).body(supervisor1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Supervisor()));
    }
}
