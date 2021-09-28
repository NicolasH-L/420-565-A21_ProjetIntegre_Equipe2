package com.equipe2.projet_integre_equipe2.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.io.Serializable;

@Data
@ToString
@NoArgsConstructor
@Entity
public class Monitor extends User implements Serializable {

    @Column(unique = true, length = 200)
    private String email;
    private String enterpriseName;

    @Builder(builderMethodName = "monitorBuilder")
    public Monitor(String password, String lastName, String firstName, String enterpriseName, String email) {
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
