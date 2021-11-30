package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import com.equipe2.projet_integre_equipe2.security.PasswordService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    public StudentRepository studentRepository;

    private PasswordService passwordService;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
        this.passwordService = new PasswordService();
    }

    public Optional<Student> registerStudent(Student student) {
        try {
            if(student.getPassword().length() <= 16 )
                student.setPassword(passwordService.encodePassword(student.getPassword()));
            return Optional.of(studentRepository.save(student));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public Optional<Boolean> verifypassword(String matricule, String pwd) {
        try {
            Student student = studentRepository.findByMatricule(matricule);
            return Optional.of(passwordService.matchPassword(pwd, student.getPassword()));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }

    public Optional<Student> loginStudent(String matricule, String password) {
        try {
            Student student = studentRepository.findByMatricule(matricule);
            return passwordService.matchPassword(password, student.getPassword()) ? Optional.of(student) : Optional.empty();
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

    public Optional<Student> validateStudent(String matricule) {
        try {
            Student student = studentRepository.findByMatricule(matricule);
            student.setIsCvValid(true);
            return Optional.of(studentRepository.saveAndFlush(student));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Student> getStudentByMatricule(String matricule){
        try {
            return Optional.of(studentRepository.findByMatricule(matricule));
        } catch (Exception e){
            return Optional.empty();
        }
    }

    public Optional<Student> resetStudentAccount(String matricule){
        try {
            Student student = studentRepository.findByMatricule(matricule);
            student.setIsCvValid(false);
            student.setCurrentStatus("En recherche");
            return Optional.of(studentRepository.save(student));
        } catch (Exception e){
            return Optional.empty();
        }
    }
}
