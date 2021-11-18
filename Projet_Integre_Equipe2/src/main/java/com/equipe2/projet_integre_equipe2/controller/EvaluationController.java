package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Evaluation;
import com.equipe2.projet_integre_equipe2.model.evaluation.InternEvaluation;
import com.equipe2.projet_integre_equipe2.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/evaluation")
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;


    @PostMapping("/save-evaluation")
    public ResponseEntity<Evaluation> saveEvaluation(@RequestBody InternEvaluation internEvaluation) {
        System.out.println("contract" + internEvaluation.getContract());
        System.out.println("behavior" + internEvaluation.getBehaviors().get(0));
        System.out.println("behavior" + internEvaluation.getBehaviors().get(1));
        System.out.println("behavior" + internEvaluation.getBehaviors().get(2));
        System.out.println("behavior" + internEvaluation.getBehaviors().get(3));
        System.out.println("appreciation" + internEvaluation.getAppreciation());
        System.out.println("actual weeks"+ internEvaluation.getActualWeeklyHours());
        System.out.println("rehire" + internEvaluation.getReHireIntern());
        return evaluationService.save(internEvaluation)
                .map(evaluation1 -> ResponseEntity.status(HttpStatus.OK).body(evaluation1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Evaluation()));

    }
}
