package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
import com.equipe2.projet_integre_equipe2.repository.OfferRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class OfferServiceTest {

    @Mock
    private OfferRepository offerRepository;

    @Mock
    private MonitorRepository monitorRepository;

    @InjectMocks
    private OfferService offerService;

    private Offer offer;

    @BeforeEach
    void setup(){
        offer = Offer.builder()
                .companyName("Cegep")
                .address("Montral")
                .salary("19")
                .jobTitle("Developpeur")
                .description("Java")
                .skills("Débrouillard")
                .jobSchedules("Temps plein")
                .workingHours("37.5")
                .monitorEmail("cegep@email.com")
                .build();
    }

    @Test
    public void testSaveOffer(){
        when(offerRepository.save(offer)).thenReturn(offer);
        Optional<Offer> actualOffer = offerService.saveOffer(offer);
        assertThat(actualOffer.get()).isEqualTo(offer);
    }

    @Test
    public void testSaveOfferFails(){
        when(offerRepository.save(offer)).thenReturn(null);
        Optional<Offer> actualOffer = offerService.saveOffer(offer);
        assertThat(actualOffer).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetAllOffers(){
        when(offerRepository.findAll()).thenReturn(getListOfOffers());
        final Optional<List<Offer>> allOffers = offerService.getAllOffers();
        assertThat(allOffers.get().size()).isEqualTo(3);
        assertThat(allOffers.get().get(0).getCompanyName()).isEqualTo("Cegep");
    }

    private List<Offer> getListOfOffers() {
        List<Offer> offerList = new ArrayList<>();
        offerList.add(Offer.builder()
                .companyName("Cegep")
                .salary("19")
                .jobTitle("Developper")
                .build());
        offerList.add(Offer.builder()
                .companyName("Cegep2")
                .salary("20")
                .jobTitle("Developper2")
                .build());
        offerList.add(Offer.builder()
                .companyName("Cegep3")
                .salary("21")
                .jobTitle("Developper3")
                .build());
        return offerList;
    }
}
