package com.equipe2.projet_integre_equipe2.model;

import lombok.*;
<<<<<<< HEAD
=======
import org.springframework.data.annotation.Id;
>>>>>>> deeec0b979de93c25e11817076372a4d64c0bc9e

import javax.persistence.GeneratedValue;

@Data
<<<<<<< HEAD
@ToString
@MappedSuperclass
public abstract class User {
=======
public class User {
>>>>>>> deeec0b979de93c25e11817076372a4d64c0bc9e

    @Id
    @GeneratedValue
    private Integer id;

    private String password;
    private String lastName;
    private String firstName;
}
