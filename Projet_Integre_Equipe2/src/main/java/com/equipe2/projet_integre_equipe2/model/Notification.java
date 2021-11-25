package com.equipe2.projet_integre_equipe2.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Notification implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String typeNotification;
    private String message;
    private String session;

    @ManyToMany
    private List<Student> student;

    @ManyToOne
    private Admin admin;

    @ManyToOne
    private Monitor monitor;
}
