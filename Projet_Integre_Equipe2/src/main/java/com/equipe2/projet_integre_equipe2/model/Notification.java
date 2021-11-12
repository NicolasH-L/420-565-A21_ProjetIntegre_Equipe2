package com.equipe2.projet_integre_equipe2.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
public class Notification implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idNotification;

    private String typeNotification;
    private String message;

    @OneToOne
    private Student student;

    @OneToOne
    private Monitor monitor;

    @OneToOne
    private Supervisor supervisor;

}
