package com.equipe2.projet_integre_equipe2.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Document implements Serializable {

    @Id
    @GeneratedValue
    private Integer idDocument;

    private String documentName;
    private Boolean isValid;
    private Boolean isRefused;
    private String session;

    @Lob
    private byte[] data;

    @OneToOne
    private Student student;
}
