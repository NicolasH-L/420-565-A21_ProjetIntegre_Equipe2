package com.equipe2.projet_integre_equipe2.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
public class Student extends User implements Serializable {

    @Column(unique = true, length = 200)
    private String matricule;
    private Boolean isCvValid = false;
    private String currentStatus = "En recherche";


    @Builder(builderMethodName = "studentBuilder")
    public Student(Integer id, String firstName, String lastName, String password, String matricule, Boolean isCvValid, String currentStatus) {
        super.setId(id);
        super.setLastName(lastName);
        super.setFirstName(firstName);
        super.setPassword(password);
        this.matricule = matricule;
        this.isCvValid = isCvValid;
        this.currentStatus = currentStatus;
    }
}
