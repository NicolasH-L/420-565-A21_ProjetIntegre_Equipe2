package com.equipe2.projet_integre_equipe2.model;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class Monitor extends User{

    private String enterpriseName;
    private String email;

}
