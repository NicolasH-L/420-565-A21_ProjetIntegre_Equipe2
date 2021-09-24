package com.equipe2.projet_integre_equipe2.model;

<<<<<<< HEAD
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
=======
import lombok.*;
import lombok.experimental.SuperBuilder;
>>>>>>> 3ede22044165fe34c102da5da12be85b7fc4d725
import org.springframework.data.annotation.Id;

import javax.persistence.GeneratedValue;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Student extends User {
<<<<<<< HEAD
=======

    @Id
    @GeneratedValue
    private Integer id;
>>>>>>> 3ede22044165fe34c102da5da12be85b7fc4d725

    private String matricule;

    @Builder
    public Student (Integer id, String password, String lastName, String firstName, String matricule){
        super(id, password, lastName, firstName);
        this.matricule = matricule;
    }
}
