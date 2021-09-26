package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.model.Supervisor;
import com.equipe2.projet_integre_equipe2.repository.SupervisorRepository;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Data
@Builder
@Service
public class SupervisorService {

    public SupervisorRepository supervisorRepository;

    public SupervisorService(SupervisorRepository supervisorRepository) {
        this.supervisorRepository = supervisorRepository;
    }

    public Optional<Supervisor> registerSupervisor(Supervisor supervisor){
        if (supervisorRepository.existsByMatricule(supervisor.getMatricule())){
            return null;
        }
        return Optional.of(supervisorRepository.save(supervisor));
    }
}
