package com.equipe2.projet_integre_equipe2.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
public class Supervisor extends User implements Serializable {

    @Column(unique = true, length = 200)
    private String matricule;

    @Builder(builderMethodName = "supervisorBuilder")
    public Supervisor(Integer id, String password, String lastName,
                      String firstName, String matricule, String actualSession) {
        super.setId(id);
        super.setLastName(lastName);
        super.setFirstName(firstName);
        super.setPassword(password);
        super.setActualSession(actualSession);
        this.matricule = matricule;
    }
}
