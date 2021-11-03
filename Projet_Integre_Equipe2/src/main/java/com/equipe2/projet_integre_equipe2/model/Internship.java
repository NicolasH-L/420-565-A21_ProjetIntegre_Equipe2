package com.equipe2.projet_integre_equipe2.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Internship implements Serializable {

    @Id
    @GeneratedValue
    private int idInternship;

    private Boolean isSignedByStudent;
    private Boolean isSignedByMonitor;
    private String status;
    private String session;

    @OneToOne
    private Offer offer;

    @OneToOne
    private Student student;

    @OneToOne
    private Supervisor supervisor;
}
