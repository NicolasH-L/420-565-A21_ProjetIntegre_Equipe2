package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    @Test
    public void testRegisterStudent(){
        // Arrange
        Student expected = Student.studentBuilder()
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .build();
        when(studentRepository.save(expected)).thenReturn(expected);
        // Act
        Optional<Student> actualStudent = studentService.registerStudent(expected);
        // Assert
        assertThat(actualStudent.get()).isEqualTo(expected);
    }
}
