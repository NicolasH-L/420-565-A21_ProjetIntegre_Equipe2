package com.equipe2.projet_integre_equipe2.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Admin {

    @Id
    @GeneratedValue
    private int id;

    private String username;
    private String password;
    private String actualSession;

    @Builder(builderMethodName = "adminBuilder")
    public Admin(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
