package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.StudentApplicated;
import com.equipe2.projet_integre_equipe2.repository.StudentApplicatedRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentApplicatedService {

    private StudentApplicatedRepository studentApplicatedRepository;

    public StudentApplicatedService(StudentApplicatedRepository studentApplicatedRepository) {
        this.studentApplicatedRepository = studentApplicatedRepository;
    }

    public Optional<StudentApplicated> saveApplication(StudentApplicated internship) {
        try {
            return Optional.of(studentApplicatedRepository.save(internship));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }
}
