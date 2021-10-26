package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.service.OfferService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(OfferController.class)
public class OfferControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
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
                .state("Invalide")
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
    public void saveOfferTest() throws Exception {
        when(offerService.saveOffer(offer)).thenReturn(Optional.of(offer));

        MvcResult result = mockMvc.perform(post("/offer/saveOffer")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(offer))).andReturn();

        var actualOffer = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Offer.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(offer).isEqualTo(actualOffer);
    }

    @Test
    public void getAllOffersTest() throws Exception {
        List<Offer> offerList = getListOfOffers();
        when(offerService.getAllOffers()).thenReturn(Optional.of(offerList));

        MvcResult result = mockMvc.perform(get("/offer/get-all-offers")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(3);
    }

    @Test
    public void getAllOffersValidByMonitor_Id() throws Exception {
        when(offerService.getAllOffersValidByMonitor_Id(monitor.getId())).thenReturn(Optional.of(getListOfOffersByMonitor()));

        MvcResult result = mockMvc.perform(get("/offer/get-all-valid-offers/" + monitor.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(),
                new TypeReference<List<Offer>>() {
                });

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(3);
    }

    @Test
    public void getAllValidOffersTest() throws Exception {
        List<Offer> offerList = getListOfValidOffers();
        when(offerService.getAllValidOffers()).thenReturn(Optional.of(offerList));

        MvcResult result = mockMvc.perform(get("/offer/get-all-valid-offers")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(2);
    }

    @Test
    public void getAllValidOffersTestFail() throws Exception {
        List<Offer> offerList = getListOfOffers();
        List<Offer> actuals;
        when(offerService.getAllValidOffers()).thenReturn(Optional.empty());

        MvcResult result = mockMvc.perform(get("/offer/get-all-valid-offers")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        try {
            actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        } catch (Exception e) {
            actuals = new ArrayList<>();
        }
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
        assertThat(actuals.size()).isNotEqualTo(offerList.size());
        assertThat(actuals).isEqualTo(new ArrayList<>());
    }

    @Test
    public void acceptOfferTest() throws Exception {
        when(offerService.acceptOffer(offer.getIdOffer())).thenReturn(Optional.of(offer));

        MvcResult result = mockMvc.perform(put("/offer/accept-offer/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(offer))).andReturn();

        var actualOffer = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Offer.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(offer).isEqualTo(actualOffer);
    }

    @Test
    public void declineOfferTest() throws Exception {
        when(offerService.declineOffer(offer.getIdOffer())).thenReturn(Optional.of(offer));

        MvcResult result = mockMvc.perform(put("/offer/decline-offer/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(offer))).andReturn();

        var actualOffer = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Offer.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(offer).isEqualTo(actualOffer);
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
                .isValid(true)
                .monitor(monitor)
                .build());
        offerList.add(Offer.builder()
                .companyName("Cegep18")
                .salary("18")
                .jobSchedules("analyst")
                .isValid(true)
                .monitor(monitor)
                .build());
        offerList.add(Offer.builder()
                .companyName("Cegep23")
                .salary("23")
                .jobSchedules("programmer")
                .isValid(true)
                .monitor(monitor)
                .build());
        return offerList;
    }
}
