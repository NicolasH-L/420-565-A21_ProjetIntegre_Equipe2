package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Document;
import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.model.StudentOffer;
import com.equipe2.projet_integre_equipe2.repository.StudentOfferRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.nio.charset.StandardCharsets;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class StudentOfferServiceTest {

    @Mock
    private StudentOfferRepository studentOfferRepository;

    @InjectMocks
    private StudentOfferService studentOfferService;

    private Offer offer;

    private Document document;

    private StudentOffer studentOffer;

    @BeforeEach
    void setup() {
        offer = Offer.builder()
                .idOffer(1)
                .companyName("test")
                .address("Montreal")
                .salary("111111111111")
                .jobTitle("Developpeur")
                .description("Java")
                .skills("Autonome")
                .jobSchedules("Temps plein")
                .workingHours("666666666")
                .monitorEmail("cegep@email.com")
                .isValid(true)
                .state("")
                .displayDate("2021-10-15")
                .deadlineDate("2021-10-30")
                .startInternshipDate("2021-10-30")
                .endInternshipDate("2021-12-30")
                .build();

        document = Document.builder()
                .documentName("CVExemple")
                .student(null)
                .data("test".getBytes(StandardCharsets.UTF_8))
                .build();

        studentOffer = StudentOffer.builder()
                .offer(offer)
                .document(document)
                .build();
    }

    @Test
    public void testApplyInternship() {
        when(studentOfferRepository.save(studentOffer)).thenReturn(studentOffer);
        Optional<StudentOffer> actualApplication = studentOfferService.saveApplication(studentOffer);
        assertThat(actualApplication.get()).isEqualTo(studentOffer);
    }

    @Test
    public void testFailedApplyInternship() {
        when(studentOfferRepository.save(studentOffer)).thenReturn(null);
        Optional<StudentOffer> actualApplication = studentOfferService.saveApplication(studentOffer);
        assertThat(actualApplication).isEqualTo(Optional.empty());
    }
}
