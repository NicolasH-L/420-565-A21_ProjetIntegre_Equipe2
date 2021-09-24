package com.equipe2.projet_integre_equipe2.model;

import lombok.*;
<<<<<<< HEAD
import org.springframework.data.annotation.Id;
=======
>>>>>>> 3ede22044165fe34c102da5da12be85b7fc4d725

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.MappedSuperclass;
import javax.persistence.Id;

@Data
<<<<<<< HEAD
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
=======
@ToString
@MappedSuperclass
public abstract class User {
>>>>>>> 3ede22044165fe34c102da5da12be85b7fc4d725

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String password;
    private String lastName;
    private String firstName;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", password='" + password + '\'' +
                ", lastName='" + lastName + '\'' +
                ", firstName='" + firstName + '\'' +
                '}';
    }
}
