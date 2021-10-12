package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/students")
public class StudentController {

   @Autowired
   StudentService studentService;

   @PostMapping("/register")
   public ResponseEntity<Student> registerStudent(@RequestBody Student student) {
       return studentService.registerStudent(student)
               .map(student1 -> ResponseEntity.status(HttpStatus.CREATED).body(student1))
               .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
   }

   @GetMapping("/{matricule}/{password}")
   public ResponseEntity<Student> loginStudent(@PathVariable String matricule, @PathVariable String password){
      return studentService.loginStudent(matricule, password)
              .map(student1 -> ResponseEntity.status(HttpStatus.OK).body(student1))
              .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Student()));
   }

   @GetMapping("/valid-cv/{matricule}")
   public ResponseEntity<Boolean> isValidStudentExists(@PathVariable String matricule){
      System.out.println("Matricule " + matricule);
      return studentService.isValidCvStudent(matricule)
              .map(student1 -> ResponseEntity.status(HttpStatus.OK).body(student1))
              .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(false));
   }

   @GetMapping("/get-all-students")
   public ResponseEntity<List<Student>> getAllStudents(){
      return studentService.getAllStudents()
              .map(student1 -> ResponseEntity.status(HttpStatus.OK).body(student1))
              .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
   }

   @PutMapping("/validate-student/{matricule}")
   public ResponseEntity<Student> validateStudent(@PathVariable String matricule){
      return studentService.validateStudent(matricule)
              .map(student1 -> ResponseEntity.status(HttpStatus.OK).body(student1))
              .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
   }
}
