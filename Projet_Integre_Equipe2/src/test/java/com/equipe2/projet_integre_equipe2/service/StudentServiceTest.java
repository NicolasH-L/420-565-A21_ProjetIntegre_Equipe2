package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
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

    private Student student;

    @BeforeEach
    void setup(){
        student = Student.studentBuilder()
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .build();
    }

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

    @Test
    public void testLoginStudent(){
        when(studentRepository.findByMatriculeAndPassword(student.getMatricule(), student.getPassword())).thenReturn(student);
        Optional<Student> actualStudent = studentService.loginStudent(student.getMatricule(), student.getPassword());
        assertThat(actualStudent.get()).isEqualTo(student);
    }

    @Test
    public void testLoginStudentFails() {
        when(studentRepository.findByMatriculeAndPassword("", "")).thenReturn(null);
        Optional<Student> actualStudent = studentService.loginStudent("", "");
        assertThat(actualStudent).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetAllStudents(){
        when(studentRepository.findAll()).thenReturn(getListOfStudents());
        final Optional<List<Student>> allOffers = studentService.getAllStudents();
        assertThat(allOffers.get().size()).isEqualTo(3);
        assertThat(allOffers.get().get(0).getMatricule()).isEqualTo("1234567");
    }

    @Test
    public void testGetAllStudentsFails(){
        when(studentRepository.findAll()).thenReturn(null);
        final Optional<List<Student>> allStudents = studentService.getAllStudents();
        assertThat(allStudents).isEqualTo(Optional.empty());
    }

    private List<Student> getListOfStudents() {
        List<Student> studentList = new ArrayList<>();
        studentList.add(Student.studentBuilder()
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .isCvValid(true)
                .build());
        studentList.add(Student.studentBuilder()
                .firstName("Lolo")
                .lastName("Lala")
                .matricule("1234568")
                .password("1235")
                .isCvValid(false)
                .build());
        studentList.add(Student.studentBuilder()
                .firstName("Lulu")
                .lastName("Tutu")
                .matricule("1234569")
                .password("1236")
                .isCvValid(true)
                .build());
        return studentList;
    }
}
