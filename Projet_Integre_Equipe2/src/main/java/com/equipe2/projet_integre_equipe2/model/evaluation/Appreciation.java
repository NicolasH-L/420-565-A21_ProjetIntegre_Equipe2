package com.equipe2.projet_integre_equipe2.model.evaluation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Appreciation {

    private String expectationResult;
    private String appreciations;
    private boolean isDiscussed;
}
