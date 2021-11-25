package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Supervisor;
import com.equipe2.projet_integre_equipe2.repository.SupervisorRepository;
import com.equipe2.projet_integre_equipe2.security.PasswordService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupervisorService {

    public SupervisorRepository supervisorRepository;
    private PasswordService passwordService;

    public SupervisorService(SupervisorRepository supervisorRepository) {
        this.supervisorRepository = supervisorRepository;
        this.passwordService = new PasswordService();
    }

    public Optional<Supervisor> registerSupervisor(Supervisor supervisor){
        try {
            if (supervisor.getPassword().length() <= 16)
                supervisor.setPassword(passwordService.encodePassword(supervisor.getPassword()));
        return Optional.of(supervisorRepository.save(supervisor));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public Optional<Supervisor> loginSupervisor(String matricule, String password){
        try {
            Supervisor supervisor = supervisorRepository.findByMatricule(matricule);
            return passwordService.matchPassword(password, supervisor.getPassword()) ? Optional.of(supervisor) : Optional.empty();
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
