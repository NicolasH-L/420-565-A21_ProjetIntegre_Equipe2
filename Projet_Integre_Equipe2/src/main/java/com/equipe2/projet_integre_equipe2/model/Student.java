package com.equipe2.projet_integre_equipe2.model;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;

import javax.persistence.GeneratedValue;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@SuperBuilder
public class Student extends User {

    @Id
    @GeneratedValue
    private Integer id;

    private String matricule;
}
