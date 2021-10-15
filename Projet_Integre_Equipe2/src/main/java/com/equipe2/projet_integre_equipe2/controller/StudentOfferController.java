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

    @PostMapping("/save-student-offer")
    public ResponseEntity<StudentOffer> postStudentOffer(@RequestBody StudentOffer studentOffer) {
        return studentOfferService.saveStudentOffer(studentOffer)
                .map(studentApplication1 -> ResponseEntity.status(HttpStatus.CREATED).body(studentApplication1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new StudentOffer()));
    }

    @GetMapping("/offer-applied/{offerId}/{studentId}")
    public ResponseEntity<Boolean> getStudentOfferExist(@PathVariable Integer offerId, @PathVariable Integer studentId) {
        return studentOfferService.isStudentNotAppliedToOffer(offerId, studentId)
                .map(studentApplication1 -> ResponseEntity.status(HttpStatus.OK).body(studentApplication1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(true));
    }

}
