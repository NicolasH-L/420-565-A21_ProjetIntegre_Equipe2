package com.equipe2.projet_integre_equipe2.repository;

import com.equipe2.projet_integre_equipe2.model.Sessions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionsRepository extends JpaRepository<Sessions, Integer> {
}
