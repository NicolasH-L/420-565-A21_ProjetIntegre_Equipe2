package com.equipe2.projet_integre_equipe2.repository;

import com.equipe2.projet_integre_equipe2.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Integer> {

}
