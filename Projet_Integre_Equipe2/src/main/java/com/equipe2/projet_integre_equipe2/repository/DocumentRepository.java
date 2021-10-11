package com.equipe2.projet_integre_equipe2.repository;

import com.equipe2.projet_integre_equipe2.model.Document;
import com.equipe2.projet_integre_equipe2.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Integer> {

<<<<<<< HEAD
    List<Document> findDocumentsByStudent(Student student);
=======
        List<Document> findDocumentsByStudent_Id(Integer id);
>>>>>>> 2224f3fdd7a7ce3cb1883c8ff0363e33c4e82969
}
