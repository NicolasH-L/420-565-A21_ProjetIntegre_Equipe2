package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Document;
import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.model.StudentApplicated;
import com.equipe2.projet_integre_equipe2.repository.StudentApplicatedRepository;
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
public class StudentApplicatedServiceTest {

    @Mock
    private StudentApplicatedRepository studentApplicatedRepository;

    @InjectMocks
    private StudentApplicatedService studentApplicatedService;

    private Offer offer;

    private Document document;

    private StudentApplicated studentApplicated;

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

        studentApplicated = StudentApplicated.builder()
                .offer(offer)
                .document(document)
                .build();
    }

    @Test
    public void testApplyInternship() {
        when(studentApplicatedRepository.save(studentApplicated)).thenReturn(studentApplicated);
        Optional<StudentApplicated> actualApplication = studentApplicatedService.saveApplication(studentApplicated);
        assertThat(actualApplication.get()).isEqualTo(studentApplicated);
    }

    @Test
    public void testFailedApplyInternship() {
        when(studentApplicatedRepository.save(studentApplicated)).thenReturn(null);
        Optional<StudentApplicated> actualApplication = studentApplicatedService.saveApplication(studentApplicated);
        assertThat(actualApplication).isEqualTo(Optional.empty());
    }
}
