package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.model.User;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import com.equipe2.projet_integre_equipe2.service.SystemService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.assertj.core.api.Assertions.assertThat;

@WebMvcTest(StudentController.class)
public class ProjetIntegreEquipe2ControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SystemService systemService;

    @MockBean
    private StudentRepository studentRepository;

    private Student expected;

    @Test
    public void subscribeTest() throws Exception {
        // Arrange remplissage de donnee
        Student student = getStudentInfo();
        // Act tester la methode
        systemService.subscribe(student);
        // Assert verifier les resultats
        assertThat(studentRepository.findStudentByMatricule(student.getMatricule()).equals(student)) ;
    }

    private Student getStudentInfo() {
        Student student = new Student();
        student.setId(1);
        student.setMatricule("1234567");
        student.setFirstName("John");
        student.setLastName("Doe");
        student.setPassword("password");
        return student;
    }



}
