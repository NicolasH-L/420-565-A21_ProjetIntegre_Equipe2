package com.equipe2.projet_integre_equipe2.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@ToString
@NoArgsConstructor
@Entity
public class Monitor extends User {

    private String enterpriseName;
    private String email;


    @Builder(builderMethodName = "monitorBuilder")
    public Monitor(Integer id, String password, String lastName, String firstName, String enterpriseName, String email) {
        super.setId(id);
        super.setLastName(lastName);
        super.setFirstName(firstName);
        super.setPassword(password);
        this.enterpriseName = enterpriseName;
        this.email = email;
    }

    @Override
    public String toString() {
        return "Monitor{" +
                "id=" + super.getId() +
                ", password='" + super.getPassword() + '\'' +
                ", lastName='" + super.getLastName() + '\'' +
                ", firstName='" + super.getFirstName() + '\'' +
                "enterpriseName='" + enterpriseName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

}
