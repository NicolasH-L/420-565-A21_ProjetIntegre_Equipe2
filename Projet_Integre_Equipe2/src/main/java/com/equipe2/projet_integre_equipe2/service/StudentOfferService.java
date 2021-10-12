package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.StudentOffer;
import com.equipe2.projet_integre_equipe2.repository.StudentOfferRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentOfferService {

    private StudentOfferRepository studentApplicatedRepository;

    public StudentOfferService(StudentOfferRepository studentApplicatedRepository) {
        this.studentApplicatedRepository = studentApplicatedRepository;
    }

    public Optional<StudentOffer> saveApplication(StudentOffer studentOffer) {
        try {
            return Optional.of(studentApplicatedRepository.save(studentOffer));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }
}
