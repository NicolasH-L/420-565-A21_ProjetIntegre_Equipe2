package com.equipe2.projet_integre_equipe2.model;

import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.persistence.GeneratedValue;

@Data
public class Student extends User {
    @Id
    @GeneratedValue
    private Integer id;

    private String matricule;
}
