package com.equipe2.projet_integre_equipe2.repository;

import com.equipe2.projet_integre_equipe2.model.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Integer> {

    List<Evaluation> findEvaluationsByContract_Internship_Offer_Monitor_Id(Integer monitorId);

    Evaluation findEvaluationByContract_Internship_Supervisor_IdAndContract_Internship_Student_Id(Integer supervisorId, Integer studentId);
}
