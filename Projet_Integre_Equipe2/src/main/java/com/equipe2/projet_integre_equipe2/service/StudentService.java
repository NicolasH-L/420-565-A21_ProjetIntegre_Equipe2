package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Data
@Builder
@Service
public class StudentService {

    public StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    public Optional<Student> registerStudent(Student student){
        if (studentRepository.existsByMatricule(student.getMatricule())){
            return null;
        }
        return Optional.of(studentRepository.save(student));
    }
}
