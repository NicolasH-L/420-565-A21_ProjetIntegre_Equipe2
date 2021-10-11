package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.StudentApplicated;
import com.equipe2.projet_integre_equipe2.service.StudentApplicatedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/offers-list")
public class StudentApplicatedController {

    @Autowired
    private StudentApplicatedService studentApplicatedService;

    @PostMapping("/save-internship")
    public ResponseEntity<StudentApplicated> postApplication(@RequestBody StudentApplicated studentApplicated) {
        return studentApplicatedService.saveApplication(studentApplicated)
                .map(studentApplicated1 -> ResponseEntity.status(HttpStatus.CREATED).body(studentApplicated1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new StudentApplicated()));
    }
}
