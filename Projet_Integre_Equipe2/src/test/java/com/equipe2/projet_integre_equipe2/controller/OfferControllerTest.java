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

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

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
}
