package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Monitor;
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

    private Monitor monitor;

    @BeforeEach
    void setup() {
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
                .state("")
                .displayDate("2021-10-15")
                .deadlineDate("2021-10-30")
                .startInternshipDate("2021-10-30")
                .endInternshipDate("2021-12-30")
                .build();

        monitor = Monitor.monitorBuilder()
                .password("toto")
                .lastName("toto")
                .firstName("toto")
                .companyName("toto")
                .email("toto@toto.toto")
                .build();
    }


    @Test
    public void testSaveOffer() {
        when(offerRepository.save(offer)).thenReturn(offer);
        Optional<Offer> actualOffer = offerService.saveOffer(offer);
        assertThat(actualOffer.get()).isEqualTo(offer);
    }

    @Test
    public void testSaveOfferFails() {
        when(offerRepository.save(offer)).thenReturn(null);
        Optional<Offer> actualOffer = offerService.saveOffer(offer);
        assertThat(actualOffer).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetAllOffers() {
        when(offerRepository.findAll()).thenReturn(getListOfOffers());
        final Optional<List<Offer>> allOffers = offerService.getAllOffers();
        assertThat(allOffers.get().size()).isEqualTo(3);
        assertThat(allOffers.get().get(0).getCompanyName()).isEqualTo("Cegep");
    }

    @Test
    public void testGetAllOffersFails() {
        when(offerRepository.findAll()).thenReturn(null);
        final Optional<List<Offer>> allOffers = offerService.getAllOffers();
        assertThat(allOffers).isEqualTo(Optional.empty());
    }

    @Test
    public void testAcceptOffer() {
        when(offerRepository.findById(offer.getIdOffer())).thenReturn(Optional.of(offer));
        when(offerRepository.saveAndFlush(offer)).thenReturn(offer);
        Optional<Offer> actualOffer = offerService.acceptOffer(offer.getIdOffer());
        assertThat(actualOffer.get().getCompanyName()).isEqualTo("Cegep");
        assertThat(actualOffer.get().getState()).isEqualTo("Valide");
        assertThat(actualOffer.get().isValid()).isTrue();
    }

    @Test
    public void testAcceptOfferFails() {
        when(offerRepository.findById(offer.getIdOffer())).thenReturn(Optional.of(offer));
        when(offerRepository.saveAndFlush(offer)).thenReturn(null);
        Optional<Offer> actualOffer = offerService.acceptOffer(offer.getIdOffer());
        assertThat(actualOffer).isEqualTo(Optional.empty());
    }

    @Test
    public void testDeclineOffer() {
        when(offerRepository.findById(offer.getIdOffer())).thenReturn(Optional.of(offer));
        when(offerRepository.saveAndFlush(offer)).thenReturn(offer);
        Optional<Offer> actualOffer = offerService.declineOffer(offer.getIdOffer());
        assertThat(actualOffer.get().getCompanyName()).isEqualTo("Cegep");
        assertThat(actualOffer.get().getState()).isEqualTo("Invalide");
        assertThat(actualOffer.get().isValid()).isFalse();
    }

    @Test
    public void testDeclineOfferFails() {
        when(offerRepository.findById(offer.getIdOffer())).thenReturn(Optional.of(offer));
        when(offerRepository.saveAndFlush(offer)).thenReturn(null);
        Optional<Offer> actualOffer = offerService.declineOffer(offer.getIdOffer());
        assertThat(actualOffer).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetAllValidOffers() {
        when(offerRepository.saveAll(getListOfValidOffers())).thenReturn(getListOfValidOffers());
        when(offerRepository.findOffersByIsValidTrue()).thenReturn(getListOfValidOffers());
        final Optional<List<Offer>> expectedValidOfferList = Optional.of(offerRepository.saveAll(getListOfValidOffers()));
        final Optional<List<Offer>> actualValidOfferList = offerService.getAllValidOffers();
        assertThat(actualValidOfferList.get().size()).isEqualTo(expectedValidOfferList.get().size());
        assertThat(actualValidOfferList.get().size()).isEqualTo(2);
    }

    @Test
    public void testGetAllValidOffersFails(){
        when(offerRepository.saveAll(getListOfOffers())).thenReturn(getListOfOffers());
        when(offerRepository.findOffersByIsValidTrue()).thenReturn(null);
        offerRepository.saveAll(getListOfOffers());
        final Optional<List<Offer>> actualValidOfferList = offerService.getAllValidOffers();
        assertThat(actualValidOfferList).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetAllOffersByMonitor() {
        when(offerRepository.findOfferByMonitor_Id(monitor.getId())).thenReturn(getListOfOffersByMonitor());
        final Optional<List<Offer>> monitorOffers = offerService.getAllOffersByMonitor_Id(monitor.getId());
        assertThat(monitorOffers.get().size()).isEqualTo(3);
        assertThat(monitorOffers.get().get(2).getCompanyName()).isEqualTo("Cegep23");
    }

    @Test
    public void testGetAllOffersByMonitorFails() {
        when(offerRepository.findOfferByMonitor_Id(monitor.getId())).thenReturn(null);
        final Optional<List<Offer>> monitorOffers = offerService.getAllOffersByMonitor_Id(monitor.getId());
        assertThat(monitorOffers).isEqualTo(Optional.empty());
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

    private List<Offer> getListOfValidOffers() {
        List<Offer> validOfferList = new ArrayList<>();
        validOfferList.add(Offer.builder()
                .companyName("Cegep2")
                .salary("20")
                .jobTitle("Developper2")
                .isValid(true)
                .build());
        validOfferList.add(Offer.builder()
                .companyName("Cegep23")
                .salary("203")
                .jobTitle("Developper23")
                .isValid(true)
                .build());
        return validOfferList;
    }

    private List<Offer> getListOfOffersByMonitor() {
        List<Offer> offerList = new ArrayList<>();
        offerList.add(Offer.builder()
                .companyName("Cegep21")
                .salary("22")
                .jobSchedules("programmer")
                .monitor(monitor)
                .build());
        offerList.add(Offer.builder()
                .companyName("Cegep18")
                .salary("18")
                .jobSchedules("analyst")
                .monitor(monitor)
                .build());
        offerList.add(Offer.builder()
                .companyName("Cegep23")
                .salary("23")
                .jobSchedules("programmer")
                .monitor(monitor)
                .build());
        return  offerList;
    }
}
