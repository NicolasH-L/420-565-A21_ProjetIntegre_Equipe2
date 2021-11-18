package com.equipe2.projet_integre_equipe2.model.evaluation;

import com.equipe2.projet_integre_equipe2.model.Contract;
import lombok.Data;

import java.util.List;

@Data
public class InternEvaluation {

    private Contract contract;
    private List<Behavior> behaviors;
    private Integer actualWeeklyHours;
    private Appreciation appreciation;
    private ReHireIntern reHireIntern;
}
