package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    public StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Optional<Student> registerStudent(Student student) {
        try {
            return Optional.of(studentRepository.save(student));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public Optional<Student> loginStudent(String matricule, String password) {
        try {
            return Optional.of(studentRepository.findByMatriculeAndPassword(matricule, password));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public Optional<Boolean> isValidCvStudent(String matricule) {
        return Optional.of(studentRepository.existsByMatriculeAndIsCvValidTrue(matricule));
    }

    public Optional<List<Student>> getAllStudents() {
        try {
            return Optional.of(studentRepository.findAll());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Student> validateStudent(String matricule){
        try {
            Student student = studentRepository.findByMatricule(matricule);
            student.setIsCvValid(true);
            return Optional.of(studentRepository.saveAndFlush(student));
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
