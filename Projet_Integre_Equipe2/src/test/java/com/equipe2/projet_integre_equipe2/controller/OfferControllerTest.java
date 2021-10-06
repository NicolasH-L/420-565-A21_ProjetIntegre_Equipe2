package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.service.OfferService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@WebMvcTest(OfferController.class)
public class OfferControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OfferService offerService;

    private Offer offer;

    @BeforeEach
    void setup(){
        offer = Offer.builder()
                .companyName("Cegep")
                .address("Montreal")
                .salary("19")
                .jobTitle("Developpeur")
                .description("Java")
                .skills("Debrouillard")
                .jobSchedules("Temps plein")
                .workingHours("37.5")
                .monitorEmail("cegep@email.com")
                .displayDate("2021-10-15")
                .deadlineDate("2021-10-30")
                .startInternshipDate("2021-10-30")
                .endInternshipDate("2021-12-30")
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

        MvcResult result = mockMvc.perform(get("/offer/getAllOffers")
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(3);
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
