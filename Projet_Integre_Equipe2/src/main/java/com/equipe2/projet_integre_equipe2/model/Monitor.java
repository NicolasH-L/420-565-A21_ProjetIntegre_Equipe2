package com.equipe2.projet_integre_equipe2.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder(toBuilder = true)
public class Monitor extends User implements Serializable {

    private String enterpriseName;
    private String email;

}
