package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Admin;
import com.equipe2.projet_integre_equipe2.repository.AdminRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AdminService {

    public AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository){
        this.adminRepository = adminRepository;
    }

    public Optional<Admin> login(String username, String password){
       try {
           return Optional.of(adminRepository.findAdminByUsernameAndPassword(username,password));
       } catch (Exception exception){
           return Optional.empty();
       }
    }
}
