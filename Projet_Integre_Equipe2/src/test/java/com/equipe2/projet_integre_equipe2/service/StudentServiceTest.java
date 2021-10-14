package com.equipe2.projet_integre_equipe2.service;

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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    private Student student;
    private Student invalidCvStudent;

    @BeforeEach
    void setup() {
        student = Student.studentBuilder()
                .id(1)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .isCvValid(true)
                .build();
        invalidCvStudent = Student.studentBuilder()
                .id(5)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234569")
                .password("1234")
                .isCvValid(false)
                .build();

    }

    @Test
    public void testRegisterStudent() {
        when(studentRepository.save(student)).thenReturn(student);
        Optional<Student> actualStudent = studentService.registerStudent(student);
        assertThat(actualStudent.get()).isEqualTo(student);
    }

    @Test
    public void testRegisterDuplicateStudentFails() {
        when(studentRepository.save(any())).thenReturn(student).thenReturn(Optional.empty());
        studentService.registerStudent(student);
        assertThat(studentService.registerStudent(student)).isEmpty();
    }

    @Test
    public void testLoginStudent() {
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
    public void testGetAllStudents() {
        when(studentRepository.findAll()).thenReturn(getListOfStudents());
        final Optional<List<Student>> allStudents = studentService.getAllStudents();
        assertThat(allStudents.get().size()).isEqualTo(3);
        assertThat(allStudents.get().get(0).getMatricule()).isEqualTo("1234567");
    }

    @Test
    public void testGetAllStudentsFails() {
        when(studentRepository.findAll()).thenReturn(null);
        final Optional<List<Student>> allStudents = studentService.getAllStudents();
        assertThat(allStudents).isEqualTo(Optional.empty());
    }

    @Test
    public void testIsValidCvStudent() {
        when(studentRepository.saveAndFlush(student)).thenReturn(student);
        when(studentRepository.existsByMatriculeAndIsCvValidTrue(student.getMatricule())).thenReturn(true);
        studentRepository.saveAndFlush(student);
        final Optional<Boolean> actualValidCvStudentExist = studentService.isValidCvStudent(student.getMatricule());
        assertThat(actualValidCvStudentExist.get()).isTrue();
    }

    @Test
    public void testIsValidCvStudentFails() {
        when(studentRepository.existsByMatriculeAndIsCvValidTrue(invalidCvStudent.getMatricule())).thenReturn(false);
        when(studentRepository.saveAndFlush(invalidCvStudent)).thenReturn(invalidCvStudent);
        studentRepository.saveAndFlush(invalidCvStudent);
        final Optional<Boolean> actualInvalidCvStudentExist = studentService.isValidCvStudent(invalidCvStudent.getMatricule());
        assertThat(actualInvalidCvStudentExist.get()).isFalse();
    }

    @Test
    public void testValidateStudent() {
        when(studentRepository.findByMatricule(invalidCvStudent.getMatricule())).thenReturn(invalidCvStudent);
        when(studentRepository.saveAndFlush(invalidCvStudent)).thenReturn(invalidCvStudent);
        Optional<Student> actualStudent = studentService.validateStudent(invalidCvStudent.getMatricule());
        assertThat(actualStudent.get().getMatricule()).isEqualTo("1234569");
        assertThat(actualStudent.get().getIsCvValid()).isTrue();
    }

    @Test
    public void testValidateStudentFails() {
        when(studentRepository.findByMatricule(invalidCvStudent.getMatricule())).thenReturn(invalidCvStudent);
        when(studentRepository.saveAndFlush(invalidCvStudent)).thenReturn(null);
        Optional<Student> actualStudent = studentService.validateStudent(invalidCvStudent.getMatricule());
        assertThat(actualStudent).isEmpty();
    }

    private List<Student> getListOfStudents() {
        List<Student> studentList = new ArrayList<>();
        studentList.add(Student.studentBuilder()
                .id(2)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .isCvValid(true)
                .build());
        studentList.add(Student.studentBuilder()
                .id(3)
                .firstName("Lolo")
                .lastName("Lala")
                .matricule("1234568")
                .password("1235")
                .isCvValid(false)
                .build());
        studentList.add(Student.studentBuilder()
                .id(4)
                .firstName("Lulu")
                .lastName("Tutu")
                .matricule("1234569")
                .password("1236")
                .isCvValid(true)
                .build());
        return studentList;
    }
}
