package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DuplicateKeyException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
public class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    private Student student = Student.studentBuilder()
            .firstName("Toto")
            .lastName("Tata")
            .matricule("1234567")
            .password("1234")
            .build();

    @Test
    public void testRegisterStudent(){
        when(studentRepository.save(student)).thenReturn(student);
        Optional<Student> actualStudent = studentService.registerStudent(student);
        assertThat(actualStudent.get()).isEqualTo(student);
    }

    @Test
    public void testRegisterDuplicateStudentFails(){
        when(studentRepository.save(any())).thenReturn(student).thenReturn(Optional.empty());
        studentService.registerStudent(student);
        assertThat(studentService.registerStudent(student)).isEmpty();
    }
}
