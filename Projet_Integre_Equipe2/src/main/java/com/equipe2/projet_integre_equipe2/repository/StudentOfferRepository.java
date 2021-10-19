package com.equipe2.projet_integre_equipe2.repository;

import com.equipe2.projet_integre_equipe2.model.StudentOffer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentOfferRepository extends JpaRepository<StudentOffer, Integer> {

    boolean existsStudentOfferByOffer_IdOfferAndStudent_Id(Integer offerId, Integer studentId);
    List<StudentOffer> findAllByOffer_IdOffer(Integer offerId);
}
