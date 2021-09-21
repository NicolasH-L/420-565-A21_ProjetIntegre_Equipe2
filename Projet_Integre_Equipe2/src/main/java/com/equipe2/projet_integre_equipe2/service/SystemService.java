package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SystemService {

    private StudentRepository studentRepository;

    public SystemService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    public Student login(String matricule, String password){
        return studentRepository.findStudentByMatriculeAndPassword(matricule, password);
    }

    public Student subscribe(Student student){
        return studentRepository.save(student);
    }
}
