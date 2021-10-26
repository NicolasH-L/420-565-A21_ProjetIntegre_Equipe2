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

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contract implements Serializable {

    @Id
    @GeneratedValue
    private Integer idContract;

    @OneToOne
    private Internship internship;

    private String collegeResponsability;
    private String enterpriseResponsability;
    private String studentResponsability;
    private String studentSignature;
    private String monitorSignature;
    private String adminSignature;
    private String signatureDateStudent;
    private String signatureDateMonitor;
    private String signatureDateAdmin;

}
