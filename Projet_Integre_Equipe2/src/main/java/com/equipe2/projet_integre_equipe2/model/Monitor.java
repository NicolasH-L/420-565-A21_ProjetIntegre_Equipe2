package com.equipe2.projet_integre_equipe2.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class Monitor extends User {

    private String enterpriseName;
    private String email;

}
