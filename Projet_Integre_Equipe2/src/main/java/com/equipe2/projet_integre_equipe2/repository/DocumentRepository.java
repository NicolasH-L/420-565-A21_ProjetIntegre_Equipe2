package com.equipe2.projet_integre_equipe2.repository;

import com.equipe2.projet_integre_equipe2.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Integer> {

        List<Document> findDocumentsByStudent_Id(Integer id);

        List<Document> findDocumentsByIsValidTrueAndStudent_Id(Integer id);
}
