package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import com.equipe2.projet_integre_equipe2.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

   @Autowired
   StudentService studentService;

   @PostMapping("/students/register")
   public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
       return studentService.registerStudent(student)
               .map(student1 -> ResponseEntity.status(HttpStatus.CREATED).body(student1))
               .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
   }

   @GetMapping("/students/{matricule}/{password}")
   public Student loginStudent(@PathVariable String matricule, @PathVariable String password){
      return studentService.loginStudent(matricule, password);
   }
}
