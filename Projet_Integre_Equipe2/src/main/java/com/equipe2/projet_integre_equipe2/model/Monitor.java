package com.equipe2.projet_integre_equipe2.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Data
@ToString
@NoArgsConstructor
@Entity
public class Monitor extends User implements Serializable {

    @Column(unique = true, length = 200)
    private String email;
    private String companyName;

    @Builder(builderMethodName = "monitorBuilder")
    public Monitor(String password, String lastName, String firstName, String companyName, String email) {
        super.setLastName(lastName);
        super.setFirstName(firstName);
        super.setPassword(password);
        this.companyName = companyName;
        this.email = email;
    }
}
