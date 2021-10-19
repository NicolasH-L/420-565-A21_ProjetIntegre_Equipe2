package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.StudentOffer;
import com.equipe2.projet_integre_equipe2.repository.StudentOfferRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentOfferService {

    private StudentOfferRepository studentOfferRepository;

    public StudentOfferService(StudentOfferRepository studentOfferRepository) {
        this.studentOfferRepository = studentOfferRepository;
    }

    public Optional<StudentOffer> saveStudentOffer(StudentOffer studentOffer) {
        try {
            return Optional.of(studentOfferRepository.save(studentOffer));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public Optional<Boolean> isStudentAppliedToOffer(Integer offerId, Integer studentId) {
        return Optional.of(studentOfferRepository.existsStudentOfferByOffer_IdOfferAndStudent_Id(offerId, studentId));
    }

    public Optional<List<StudentOffer>> getAllAcceptedStudentOffers(){
        try {
            return Optional.of(studentOfferRepository.findStudentOffersByIsAcceptedTrue());
        } catch (Exception e){
            return Optional.empty();
        }
    }
}
