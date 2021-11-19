package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.*;
import com.equipe2.projet_integre_equipe2.repository.EvaluationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class EvaluationServiceTest {

    @Mock
    private EvaluationRepository evaluationRepository;

    @InjectMocks
    private EvaluationService evaluationService;

    private Contract contract;
    private Offer offer;
    private Internship internship;
    private Monitor monitor;
    private Student student;
    private String status;


    @BeforeEach
    void setup() throws IOException {

    }

    @Test
    void testGetAllEvaluations() {
        when(evaluationRepository.findAll()).thenReturn(getAllEvaluationsList());
        final Optional<List<Evaluation>> allEvaluations = evaluationService.getAllEvaluations();
        assertThat(allEvaluations.get().size()).isEqualTo(2);
        assertThat(allEvaluations.get().get(0).getEvaluationName()).isEqualTo("evaluation-toto");
    }

    private List<Evaluation> getAllEvaluationsList() {
        List<Evaluation> evaluationList = new ArrayList<>();
        evaluationList.add(Evaluation.builder()
                .idEvaluation(1)
                .evaluationName("evaluation-toto")
                .session("winter2022")
                .pdf(null)
                .contract(null)
                .build());

        evaluationList.add(Evaluation.builder()
                .idEvaluation(2)
                .evaluationName("evaluation-tata")
                .session("winter2022")
                .pdf(null)
                .contract(null)
                .build());
        return evaluationList;
    }

}
