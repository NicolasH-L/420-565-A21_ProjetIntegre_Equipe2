package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Admin;
import com.equipe2.projet_integre_equipe2.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/{username}/{password}")
    public ResponseEntity<Admin> loginAdmin(@PathVariable String username, @PathVariable String password){
        return adminService.login(username,password)
                .map(admin1 -> ResponseEntity.status(HttpStatus.OK).body(admin1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Admin()));
    }

    @GetMapping("/get-all-admins")
    public ResponseEntity<List<Admin>> getAllAdmin(){
        return adminService.getAllAdmin()
                .map(admin1 -> ResponseEntity.status(HttpStatus.OK).body(admin1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }
}
