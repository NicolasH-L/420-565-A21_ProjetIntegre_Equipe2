package com.equipe2.projet_integre_equipe2.model;

import lombok.Data;

import java.io.Serializable;

@Data

public class Supervisor extends User implements Serializable {

    private String matricule;
}
