package com.equipe2.projet_integre_equipe2.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Evaluation implements Serializable {

    @Id
    @GeneratedValue
    private Integer idEvaluation;

    private String evaluationName;
    private String session;

    @Lob
    private byte[] pdf;

    @OneToOne
    private Contract contract;
}
