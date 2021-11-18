package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Evaluation;
import com.equipe2.projet_integre_equipe2.model.evaluation.InternEvaluation;
import com.equipe2.projet_integre_equipe2.repository.EvaluationRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EvaluationService {

    public EvaluationRepository evaluationRepository;

    public EvaluationService(EvaluationRepository evaluationRepository){
        this.evaluationRepository = evaluationRepository;
    }


    public Optional<Evaluation> save(InternEvaluation internEvaluation) {
        try{
            System.out.println(internEvaluation);
            return Optional.empty();
        }catch(Exception e){
            return Optional.empty();
        }
    }
}
