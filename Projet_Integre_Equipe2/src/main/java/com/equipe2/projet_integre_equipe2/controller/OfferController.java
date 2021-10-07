package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/offer")
public class OfferController {

    @Autowired
    private OfferService offerService;

    @PostMapping("/saveOffer")
    public ResponseEntity<Offer> saveOffer(@RequestBody Offer offer) {
        return offerService.saveOffer(offer)
                .map(offer1 -> ResponseEntity.status(HttpStatus.CREATED).body(offer1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Offer()));
    }

    @GetMapping("/get-all-offers")
    public ResponseEntity<List<Offer>> getAllOffers(){
        return offerService.getAllOffers()
                .map(offer1 -> ResponseEntity.status(HttpStatus.OK).body(offer1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @PutMapping("/accept-offer/{id}")
    public ResponseEntity<Offer> acceptOffer(@PathVariable Integer id){
        return offerService.acceptOffer(id)
                .map(offer1 -> ResponseEntity.status(HttpStatus.OK).body(offer1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
