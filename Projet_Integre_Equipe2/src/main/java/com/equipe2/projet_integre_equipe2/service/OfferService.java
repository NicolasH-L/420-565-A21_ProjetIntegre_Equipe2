package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
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

    private MonitorRepository monitorRepository;

    public OfferService(OfferRepository offerRepository, MonitorRepository monitorRepository){
        this.offerRepository = offerRepository;
        this.monitorRepository = monitorRepository;
    }

    public Optional<Offer> saveOffer(Offer offer){
        try {
            offer.setMonitor(monitorRepository.findMonitorByEmailIgnoreCase(offer.getMonitorEmail()));
            return Optional.of(offerRepository.save(offer));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }
}