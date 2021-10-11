package com.equipe2.projet_integre_equipe2.repository;

import com.equipe2.projet_integre_equipe2.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {

    Student findByMatriculeAndPassword(String matricule, String password);

    boolean existsByMatriculeAndIsCvValidTrue(String matricule);

    Student findByMatricule(String matricule);

}
