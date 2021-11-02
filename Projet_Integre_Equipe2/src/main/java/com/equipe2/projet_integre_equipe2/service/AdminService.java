package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Admin;
import com.equipe2.projet_integre_equipe2.repository.AdminRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
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

    @Transactional
    public Optional<List<Admin>> getAllAdmin() {
        try {
            return Optional.of(adminRepository.findAll());
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Admin> saveAdmin(Admin admin) {
        try {
            return Optional.of(adminRepository.save(admin));
        } catch (Exception exception) {
            return Optional.empty();
        }
    }
}
