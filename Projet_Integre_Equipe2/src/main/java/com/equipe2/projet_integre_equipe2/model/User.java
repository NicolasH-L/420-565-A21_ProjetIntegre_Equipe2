package com.equipe2.projet_integre_equipe2.model;

import lombok.Data;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;

import javax.persistence.GeneratedValue;

@Data
@SuperBuilder
public class User {

    @Id
    @GeneratedValue
    private Integer id;

    private String password;
    private String lastName;
    private String firstName;
}
