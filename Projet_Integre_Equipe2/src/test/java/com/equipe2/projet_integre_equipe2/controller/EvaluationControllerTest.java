package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.*;
import com.equipe2.projet_integre_equipe2.model.evaluation.Appreciation;
import com.equipe2.projet_integre_equipe2.model.evaluation.Behavior;
import com.equipe2.projet_integre_equipe2.model.evaluation.InternEvaluation;
import com.equipe2.projet_integre_equipe2.model.evaluation.ReHireIntern;
import com.equipe2.projet_integre_equipe2.service.EvaluationService;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

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

}
