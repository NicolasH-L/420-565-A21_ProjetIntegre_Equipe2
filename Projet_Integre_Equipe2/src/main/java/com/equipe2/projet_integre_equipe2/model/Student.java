package com.equipe2.projet_integre_equipe2.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import javax.persistence.GeneratedValue;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Student extends User {

    @Id
    @GeneratedValue
    private Integer id;
    private String matricule;

    @Builder
    public Student (Integer id, String password, String lastName, String firstName, String matricule){
        super(id, password, lastName, firstName);
        this.matricule = matricule;
    }
}
