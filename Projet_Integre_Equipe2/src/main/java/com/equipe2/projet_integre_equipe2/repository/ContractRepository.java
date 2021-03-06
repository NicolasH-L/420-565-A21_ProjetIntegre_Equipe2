package com.equipe2.projet_integre_equipe2.repository;

import com.equipe2.projet_integre_equipe2.model.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContractRepository extends JpaRepository<Contract, Integer> {

    Contract findContractByInternship_Student_IdAndSession(Integer id, String session);

    List<Contract> findContractsByInternship_Student_Id(Integer id);

    List<Contract> findContractsByInternship_Offer_Monitor_Id(Integer id);

    List<Contract> findContractsByInternship_Offer_Monitor_IdAndInternship_Status(Integer id, String status);
}
