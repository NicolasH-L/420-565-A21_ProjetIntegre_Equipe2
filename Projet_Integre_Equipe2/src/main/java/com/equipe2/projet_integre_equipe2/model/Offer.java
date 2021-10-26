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
    private boolean isValid;
    private String state;
    private String displayDate;
    private String deadlineDate;
    private String startInternshipDate;
    private String endInternshipDate;
    private String session;

    @OneToOne
    private Monitor monitor;
}
