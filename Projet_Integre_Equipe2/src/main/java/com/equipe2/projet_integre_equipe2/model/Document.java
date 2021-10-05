package com.equipe2.projet_integre_equipe2.model;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity

public class Document implements Serializable {

    @Id
    @GeneratedValue
    private Integer idDocument;

    private String documentName;

    @Lob
    private byte[] data;

    @OneToOne
    private Student student;
}
