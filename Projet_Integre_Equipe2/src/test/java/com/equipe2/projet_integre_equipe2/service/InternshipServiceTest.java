package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Internship;
import com.equipe2.projet_integre_equipe2.repository.InternshipRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class InternshipServiceTest {

    @Mock
    private InternshipRepository internshipRepository;

    @InjectMocks
    private InternshipService internshipService;

    private Internship internship;

    @BeforeEach
    void setup() {
        internship = Internship.builder()
                .isSignedByStudent(false)
                .isSignedByMonitor(false)
                .offer(null)
                .student(null)
                .build();
    }

    @Test
    public void testSaveInternship(){
        when(internshipRepository.save(internship)).thenReturn(internship);
        Optional<Internship> actualInternship = internshipService.saveInternship(internship);
        assertThat(actualInternship.get()).isEqualTo(internship);
    }

    @Test
    public void testSaveInternshipFails(){
        when(internshipRepository.save(internship)).thenReturn(null);
        Optional<Internship> actualInternship = internshipService.saveInternship(internship);
        assertThat(actualInternship).isEmpty();
    }
}
