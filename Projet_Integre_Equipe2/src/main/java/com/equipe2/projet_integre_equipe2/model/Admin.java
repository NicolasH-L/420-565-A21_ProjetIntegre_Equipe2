package com.equipe2.projet_integre_equipe2.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
@NoArgsConstructor
public class Admin {

    @Id
    @GeneratedValue
    private int id;

    private String username;
    private String password;
    private String actualSession;

    @Builder(builderMethodName = "adminBuilder")
    public Admin(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
