package com.equipe2.projet_integre_equipe2.repository;

import com.equipe2.projet_integre_equipe2.model.Monitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonitorRepository extends JpaRepository<Monitor, Integer> {

    Monitor findMonitorByEmailAndPassword(String email, String password);

    Monitor findMonitorByEmail(String email);

    boolean existsByEmail(String email);
}
