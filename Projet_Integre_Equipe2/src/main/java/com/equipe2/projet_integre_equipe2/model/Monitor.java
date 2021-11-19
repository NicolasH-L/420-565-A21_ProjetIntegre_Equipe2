package com.equipe2.projet_integre_equipe2.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
public class Monitor extends User implements Serializable {

    @Column(unique = true, length = 200)
    private String email;
    private String companyName;
    private String telephoneNumber;

    @Builder(builderMethodName = "monitorBuilder")
    public Monitor(Integer id, String password, String lastName, String firstName,
                   String companyName, String telephoneNumber, String email, String actualSession) {
        super.setId(id);
        super.setLastName(lastName);
        super.setFirstName(firstName);
        super.setPassword(password);
        super.setActualSession(actualSession);
        this.companyName = companyName;
        this.telephoneNumber = telephoneNumber;
        this.email = email;
    }
}
