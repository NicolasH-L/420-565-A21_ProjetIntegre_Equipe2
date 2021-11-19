package com.equipe2.projet_integre_equipe2.model.evaluation;

import lombok.Data;

import java.util.List;

@Data
public class Behavior {

    private String header;
    private String subHeader;
    private List<Capability> capabilities;
    private String comments;
}
