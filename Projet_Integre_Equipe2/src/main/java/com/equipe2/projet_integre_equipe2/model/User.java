package com.equipe2.projet_integre_equipe2.model;

import lombok.*;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@Data
@MappedSuperclass

public abstract class User {

    @Id
    @GeneratedValue
    private Integer id;

    private String password;
    private String lastName;
    private String firstName;
}
