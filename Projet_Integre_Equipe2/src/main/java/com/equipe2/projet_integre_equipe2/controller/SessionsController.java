package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Sessions;
import com.equipe2.projet_integre_equipe2.service.SessionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/sessions")
public class SessionsController {

    @Autowired
    private SessionsService sessionsService;

    @GetMapping("/get-all-sessions")
    public ResponseEntity<List<Sessions>> getAllSessions(){
        return sessionsService.getAllSessions()
                .map(sessions1 -> ResponseEntity.status(HttpStatus.OK).body(sessions1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
