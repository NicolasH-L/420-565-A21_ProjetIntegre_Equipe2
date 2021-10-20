package com.equipe2.projet_integre_equipe2.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Internship {

    @Id
    @GeneratedValue
    private int idInternship;

    private Boolean isSignedByStudent;
    private Boolean isSignedByMonitor;
    private String status;

    @OneToOne
    private Offer offer;

    @OneToOne
    private Student student;
}
