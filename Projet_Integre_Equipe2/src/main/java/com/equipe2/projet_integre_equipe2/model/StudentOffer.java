package com.equipe2.projet_integre_equipe2.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentOffer implements Serializable {

    @Id
    @GeneratedValue
    private int idStudentOffer;

    private Boolean isAccepted = false;
    private Boolean isInternshipStarted = false;
    private String session;

    @OneToOne
    private Offer offer;

    @OneToOne
    private Document document;

    @OneToOne
    private Student student;

    private String interviewDate;
}
