<<<<<<< HEAD
package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import com.equipe2.projet_integre_equipe2.service.SystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    SystemService systemService;

    @GetMapping("/projetIntegre/student/{matricule}/{password}")
    public Student login(@PathVariable("matricule") String matricule, @PathVariable("password") String password){
        return systemService.login(matricule,password);
    }

    @PostMapping
    public Student subscribe(@RequestBody Student student) {
        return systemService.subscribe(student);
    }
}
=======
//package com.equipe2.projet_integre_equipe2.controller;
//
//import com.equipe2.projet_integre_equipe2.model.Student;
//import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
//import com.equipe2.projet_integre_equipe2.service.SystemService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:3000")
//public class StudentController {
//
//    @Autowired
//    StudentRepository studentRepository;
//
//    @Autowired
//    SystemService systemService;
//
//    @GetMapping("/projetIntegre/student/{matricule}/{password}")
//    public Student login(@PathVariable("matricule") String matricule, @PathVariable("password") String password){
//        return systemService.login(matricule,password);
//    }
//
//    @PostMapping(value = "/projetIntegre")
//    public Student subscribe(@RequestBody Student student) {
//        return systemService.subscribe(student);
//    }
//}
>>>>>>> 3ede22044165fe34c102da5da12be85b7fc4d725
