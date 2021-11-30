package com.equipe2.projet_integre_equipe2.repository;

import com.equipe2.projet_integre_equipe2.model.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, Integer> {

    Internship findInternshipByStudent_IdAndSession(Integer id, String session);

    List<Internship> findInternshipsBySupervisor_Id(Integer id);
}
