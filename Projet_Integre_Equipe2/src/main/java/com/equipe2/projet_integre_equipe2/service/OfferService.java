package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.repository.OfferRepository;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Data
@Builder
@Service
public class OfferService {

    private OfferRepository offerRepository;

    public OfferService(OfferRepository offerRepository){
        this.offerRepository = offerRepository;
    }

    public Optional<Offer> saveOffer(Offer offer){
        try {
            return Optional.of(offerRepository.save(offer));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }
}
