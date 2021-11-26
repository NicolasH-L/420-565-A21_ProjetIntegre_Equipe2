package com.equipe2.projet_integre_equipe2.model.evaluation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Behavior {

    private String header;
    private String subHeader;
    private List<Capability> capabilities;
    private String comments;
}
