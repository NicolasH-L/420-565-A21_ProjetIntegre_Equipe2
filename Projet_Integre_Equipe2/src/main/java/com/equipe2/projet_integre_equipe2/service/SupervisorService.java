package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Supervisor;
import com.equipe2.projet_integre_equipe2.repository.SupervisorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupervisorService {

    public SupervisorRepository supervisorRepository;

    public SupervisorService(SupervisorRepository supervisorRepository) {
        this.supervisorRepository = supervisorRepository;
    }

    public Optional<Supervisor> registerSupervisor(Supervisor supervisor){
        try {
        return Optional.of(supervisorRepository.save(supervisor));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public Optional<Supervisor> loginSupervisor(String matricule, String password){
        try {
            return Optional.of(supervisorRepository.findByMatriculeAndPassword(matricule, password));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public Optional<List<Supervisor>> getAllSupervisors() {
        try {
            return Optional.of(supervisorRepository.findAll());
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
