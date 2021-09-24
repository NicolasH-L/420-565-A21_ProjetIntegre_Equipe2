package com.equipe2.projet_integre_equipe2.model;

import lombok.*;

import javax.persistence.Entity;
import java.io.Serializable;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Supervisor extends User implements Serializable {

    private String matricule;


    @Builder(builderMethodName = "supervisorBuilder")
    public Supervisor(Integer id, String password, String lastName, String firstName, String enterpriseName, String email, String matricule) {
        super.setId(id);
        super.setLastName(lastName);
        super.setFirstName(firstName);
        super.setPassword(password);
        this.matricule = matricule;
    }

    public String toString() {
        return "Monitor{" +
                "id=" + super.getId() +
                ", password='" + super.getPassword() + '\'' +
                ", lastName='" + super.getLastName() + '\'' +
                ", firstName='" + super.getFirstName() + '\'' +
                ", matricule='" + matricule + '\'' +
                '}';
    }
}
