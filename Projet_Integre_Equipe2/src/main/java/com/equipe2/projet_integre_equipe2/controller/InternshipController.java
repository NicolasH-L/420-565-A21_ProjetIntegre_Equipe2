package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Internship;
import com.equipe2.projet_integre_equipe2.service.InternshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/internship")
public class InternshipController {

    @Autowired
    private InternshipService internshipService;

    @PostMapping("/save-internship")
    public ResponseEntity<Internship> saveInternship(@RequestBody Internship internship) {
        return internshipService.saveInternship(internship)
                .map(internship1 -> ResponseEntity.status(HttpStatus.CREATED).body(internship1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Internship()));
    }

    @GetMapping("/get-all-internships")
    public ResponseEntity<List<Internship>> getAllInternships() {
        return internshipService.getAllInternships()
                .map(internship1 -> ResponseEntity.status(HttpStatus.OK).body(internship1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/get-internship/{studentId}")
    public ResponseEntity<Internship> getInternshipByStudentId(@PathVariable Integer studentId) {
        return internshipService.getInternshipByStudentId(studentId)
                .map(internship1 -> ResponseEntity.status(HttpStatus.OK).body(internship1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/get-all-internships-by-supervisor/{idSupervisor}")
    public ResponseEntity<List<Internship>> getAllInternshipsBySupervisorId(@PathVariable Integer idSupervisor) {
        return internshipService.getAllInternshipBySupervisorId(idSupervisor)
                .map(internship1 -> ResponseEntity.status(HttpStatus.OK).body(internship1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

}
