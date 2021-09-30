package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class OfferController {

    @Autowired
    private OfferService offerService;

    @PostMapping("/offer/saveOffer")
    public ResponseEntity<Offer> saveOffer(@RequestBody Offer offer) {
        return offerService.saveOffer(offer)
                .map(offer1 -> ResponseEntity.status(HttpStatus.CREATED).body(offer1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
