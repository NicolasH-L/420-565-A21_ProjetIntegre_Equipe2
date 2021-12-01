package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Evaluation;
import com.equipe2.projet_integre_equipe2.model.evaluation.InternEvaluation;
import com.equipe2.projet_integre_equipe2.service.EvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://10.10.68.10:3000"})
@RequestMapping("/evaluation")
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    @PostMapping("/save-evaluation")
    public ResponseEntity<Evaluation> saveEvaluation(@RequestBody InternEvaluation internEvaluation) {
        return evaluationService.registerEvaluation(internEvaluation)
                .map(evaluation1 -> ResponseEntity.status(HttpStatus.OK).body(evaluation1))
                .orElse(ResponseEntity.status(HttpStatus.OK).body(new Evaluation()));
    }

    @GetMapping("/get-all-by-monitor/{idMonitor}")
    public ResponseEntity<List<Evaluation>> getEvaluationsByMonitorId(@PathVariable Integer idMonitor){
        return evaluationService.getEvaluationsByMonitorId(idMonitor)
                .map(evaluations -> ResponseEntity.status(HttpStatus.OK).body(evaluations))
                .orElse(ResponseEntity.status(HttpStatus.OK).build());
    }

    @GetMapping("/get-all-evaluations")
    public ResponseEntity<List<Evaluation>> getAllEvaluations(){
        return evaluationService.getAllEvaluations()
                .map(evaluations -> ResponseEntity.status(HttpStatus.OK).body(evaluations))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
