package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.StudentOffer;
import com.equipe2.projet_integre_equipe2.repository.StudentOfferRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentOfferService {

    private StudentOfferRepository studentOfferRepository;

    public StudentOfferService(StudentOfferRepository studentOfferRepository) {
        this.studentOfferRepository = studentOfferRepository;
    }

    public Optional<StudentOffer> saveStudentOffer(StudentOffer studentOffer) {
        try {
            if (studentOfferRepository.existsStudentOfferByStudent_IdAndOffer_IdOffer(studentOffer.getStudent().getId(), studentOffer.getOffer().getIdOffer()))
                return Optional.empty();

            return Optional.of(studentOfferRepository.save(studentOffer));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

}
