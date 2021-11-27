package com.equipe2.projet_integre_equipe2.model.evaluation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReHireIntern {

    private String hireAgain;
    private String description;
    private String name;
    private String signature;
    private String jobTitle;
    private String date;

}
