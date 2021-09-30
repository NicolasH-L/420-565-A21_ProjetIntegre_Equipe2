package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Offer;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Data
@Builder
@Service
public class OfferService {

    public Optional<Offer> saveOffer(Offer offer){
        return null;
    }

}
