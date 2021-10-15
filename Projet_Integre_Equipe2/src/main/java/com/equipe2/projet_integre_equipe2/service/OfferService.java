package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import com.equipe2.projet_integre_equipe2.repository.OfferRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    private OfferRepository offerRepository;

    private MonitorRepository monitorRepository;

    public OfferService(OfferRepository offerRepository, MonitorRepository monitorRepository) {
        this.offerRepository = offerRepository;
        this.monitorRepository = monitorRepository;
    }

    public Optional<Offer> saveOffer(Offer offer) {
        try {
            offer.setMonitor(monitorRepository.findMonitorByEmailIgnoreCase(offer.getMonitorEmail()));
            return Optional.of(offerRepository.save(offer));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public Optional<List<Offer>> getAllOffers() {
        try {
            return Optional.of(offerRepository.findAll());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Offer>> getAllValidOffers() {
        try {
            return Optional.of(offerRepository.findOffersByIsValidTrue());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Offer> acceptOffer(Integer id) {
        try {
            Optional<Offer> offer = offerRepository.findById(id);
            offer.get().setState("Valide");
            offer.get().setValid(true);
            return Optional.of(offerRepository.saveAndFlush(offer.get()));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Offer> declineOffer(Integer id) {
        try {
            Optional<Offer> offer = offerRepository.findById(id);
            offer.get().setState("Invalide");
            offer.get().setValid(false);
            return Optional.of(offerRepository.saveAndFlush(offer.get()));
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
