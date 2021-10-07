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
                .idOffer(1)
                .companyName("Cegep")
                .address("Montral")
                .salary("19")
                .jobTitle("Developpeur")
                .description("Java")
                .skills("Debrouillard")
                .jobSchedules("Temps plein")
                .workingHours("37.5")
                .monitorEmail("cegep@email.com")
                .isValid(false)
                .state("Invalide")
                .displayDate("2021-10-15")
                .deadlineDate("2021-10-30")
                .startInternshipDate("2021-10-30")
                .endInternshipDate("2021-12-30")
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

    @Test
    public void testGetAllOffersFails(){
        when(offerRepository.findAll()).thenReturn(null);
        final Optional<List<Offer>> allOffers = offerService.getAllOffers();
        assertThat(allOffers).isEqualTo(Optional.empty());
    }

    @Test
    public void testAcceptOffer(){
        when(offerRepository.findById(offer.getIdOffer())).thenReturn(Optional.of(offer));
        when(offerRepository.saveAndFlush(offer)).thenReturn(offer);
        Optional<Offer> actualOffer = offerService.acceptOffer(offer.getIdOffer());
        assertThat(actualOffer.get().getCompanyName()).isEqualTo("Cegep");
        assertThat(actualOffer.get().getState()).isEqualTo("Valide");
        assertThat(actualOffer.get().isValid()).isTrue();
    }

    @Test
    public void testAcceptOfferFails(){
        when(offerRepository.findById(offer.getIdOffer())).thenReturn(Optional.of(offer));
        when(offerRepository.saveAndFlush(offer)).thenReturn(null);
        Optional<Offer> actualOffer = offerService.acceptOffer(offer.getIdOffer());
        assertThat(actualOffer).isEqualTo(Optional.empty());
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
