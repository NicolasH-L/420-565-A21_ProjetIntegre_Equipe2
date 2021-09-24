package com.equipe2.projet_integre_equipe2.model;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.Id;
import javax.persistence.GeneratedValue;

@Data
public class Student extends User {
<<<<<<< HEAD

=======
>>>>>>> deeec0b979de93c25e11817076372a4d64c0bc9e
    @Id
    @GeneratedValue
    private Integer id;

    private String matricule;
}
