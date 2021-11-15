package com.equipe2.projet_integre_equipe2.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contract implements Serializable {

    @Id
    @GeneratedValue
    private int idContract;

    private String collegeResponsability;
    private String companyResponsability;
    private String studentResponsability;
    private String studentSignature;
    private String monitorSignature;
    private String adminSignature;
    private String signatureDateStudent;
    private String signatureDateMonitor;
    private String signatureDateAdmin;
    private String session;

    @Lob
    private byte[] pdf;

    @OneToOne
    private Internship internship;
}
