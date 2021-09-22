package com.equipe2.projet_integre_equipe2.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.persistence.GeneratedValue;

@Data
public class Student extends User {

    private String matricule;

    @Builder
    public Student (Integer id, String password, String lastName, String firstName, String matricule){
        super(id, password, lastName, firstName);
        this.matricule = matricule;
    }
}
