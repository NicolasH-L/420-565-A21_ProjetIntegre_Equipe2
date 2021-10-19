package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Internship;
import com.equipe2.projet_integre_equipe2.repository.InternshipRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InternshipService {

    private InternshipRepository internshipRepository;

    public InternshipService(InternshipRepository internshipRepository){
        this.internshipRepository = internshipRepository;
    }

    public Optional<Internship> saveInternship(Internship internship){
        try {
            return Optional.of(internshipRepository.save(internship));
        } catch (Exception e){
            return Optional.empty();
        }
    }
}
