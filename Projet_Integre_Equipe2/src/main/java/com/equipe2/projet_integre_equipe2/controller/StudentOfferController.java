package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.StudentOffer;
import com.equipe2.projet_integre_equipe2.service.StudentOfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/offers-list")
public class StudentOfferController {

    @Autowired
    private StudentOfferService studentOfferService;

    @PostMapping("/save-internship-offer")
    public ResponseEntity<StudentOffer> postStudentOffer(@RequestBody StudentOffer studentOffer) {
        return studentOfferService.saveStudentOffer(studentOffer)
                .map(studentApplication1 -> ResponseEntity.status(HttpStatus.CREATED).body(studentApplication1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new StudentOffer()));
    }

//    @GetMapping("/student-offer-exist/{}")
//    public ResponseEntity<Boolean> getStudentOfferExist(@RequestBody StudentOffer studentOffer) {
//        return studentOfferService.getStudentOfferIsExist(studentOffer)
//                .map(studentApplication1 -> ResponseEntity.status(HttpStatus.CREATED).body(studentApplication1))
//                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(false));
//    }
}
