package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Internship;
import com.equipe2.projet_integre_equipe2.service.InternshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/offers-list")
public class InternshipController {

    @Autowired
    private InternshipService internshipService;

    @PostMapping("/save-internship")
    public ResponseEntity<Internship> postInternship(@RequestBody Internship internship) {
        return internshipService.saveInternship(internship)
                .map(internship1 -> ResponseEntity.status(HttpStatus.CREATED).body(internship1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Internship()));
    }
}
