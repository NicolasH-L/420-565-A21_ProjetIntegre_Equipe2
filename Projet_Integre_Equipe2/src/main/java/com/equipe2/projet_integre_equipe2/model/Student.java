package com.equipe2.projet_integre_equipe2.model;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

@Data
@Entity
@NoArgsConstructor
public class Student extends User {

    private String matricule;

    @Builder(builderMethodName = "studentBuilder")
    public Student(String firstName, String lastName, String password, String matricule ) {
        super.setLastName(lastName);
        super.setFirstName(firstName);
        super.setPassword(password);
        this.matricule = matricule;
    }
}
