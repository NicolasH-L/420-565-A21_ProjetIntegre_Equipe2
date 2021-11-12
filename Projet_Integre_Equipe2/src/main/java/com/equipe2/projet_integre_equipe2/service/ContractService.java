package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Contract;
import com.equipe2.projet_integre_equipe2.repository.ContractRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractService {

    public ContractRepository contractRepository;

    public ContractService(ContractRepository contractRepository){this.contractRepository = contractRepository;}

    public Optional<Contract> saveContract(Contract contract){
        try{
            return Optional.of(contractRepository.save(contract));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Contract> getContractByStudentId(Integer id){
        try{
            return Optional.of(contractRepository.findContractByInternship_Student_Id(id));
        } catch (Exception e){
            return Optional.empty();
        }
    }

    public Optional<List<Contract>> getContractsByMonitorId(Integer id) {
        try{
            return Optional.of(contractRepository.findContractsByInternship_Offer_Monitor_Id(id));
        }catch (Exception e){
            return Optional.empty();
        }
    }

    public Optional<Contract> getContractByIdContract(Integer id){
        try{
            return Optional.of(contractRepository.findContractByIdContract(id));
        } catch (Exception e){
            return Optional.empty();
        }
    }



    public Optional<List<Contract>> getAllContracts(){
        try {
            return Optional.of(contractRepository.findAll());
        } catch (Exception e){
            return Optional.empty();
        }
    }
}
