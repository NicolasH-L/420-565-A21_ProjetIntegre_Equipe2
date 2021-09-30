package com.equipe2.projet_integre_equipe2.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.io.Serializable;

@Data
@Entity
public class Offer implements Serializable {

    @Id
    @GeneratedValue
    private Integer idOffer;

    private String companyName;
    private String address;
    private String salary;
    private String jobTitle;
    private String description;
    private String skills;
    private String jobSchedules;
    private String workingHours;
    private String monitorEmail;

    @OneToOne
    private Monitor monitor;
}
