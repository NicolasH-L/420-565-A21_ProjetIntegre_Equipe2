package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.*;
import com.equipe2.projet_integre_equipe2.model.evaluation.Appreciation;
import com.equipe2.projet_integre_equipe2.model.evaluation.Behavior;
import com.equipe2.projet_integre_equipe2.model.evaluation.InternEvaluation;
import com.equipe2.projet_integre_equipe2.model.evaluation.ReHireIntern;
import com.equipe2.projet_integre_equipe2.service.EvaluationService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@WebMvcTest(EvaluationController.class)
public class EvaluationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EvaluationService evaluationService;

    private Contract contract;
    private Offer offer;
    private Internship internship;
    private Monitor monitor;
    private Student student;
    private String status;
    private Evaluation evaluation;

    private InternEvaluation internEvaluation;
    private Appreciation appreciation;
    private ReHireIntern reHireIntern;
    private List<Behavior> behaviorList;

    @BeforeEach
    void setup(){

    }

    @Test
    public void testGetAllEvaluations() throws Exception {
        when(evaluationService.getAllEvaluations()).thenReturn(Optional.of(getAllEvaluationsList()));

        MvcResult result = mockMvc.perform(get("/evaluation/get-all-evaluations")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(2);
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
