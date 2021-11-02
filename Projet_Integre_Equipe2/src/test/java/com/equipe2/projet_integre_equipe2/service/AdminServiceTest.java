package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Admin;
import com.equipe2.projet_integre_equipe2.repository.AdminRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class AdminServiceTest {

    @Mock
    private AdminRepository adminRepository;

    @InjectMocks
    private AdminService adminService;

    public Admin admin;

    @BeforeEach
    void setup(){
         admin = Admin.adminBuilder()
                .username("username")
                .password("password")
                .build();
    }

    @Test
    public void testLoginAdmin(){
        when(adminRepository.findAdminByUsernameAndPassword(admin.getUsername(), admin.getPassword())).thenReturn(admin);
        Optional<Admin> actualAdmin = adminService.login(admin.getUsername(),admin.getPassword());
        assertThat(actualAdmin.get()).isEqualTo(admin);
    }

    @Test
    public void testLoginAdminFails() {
        when(adminRepository.findAdminByUsernameAndPassword("", "")).thenReturn(null);
        Optional<Admin> actualAdmin = adminService.login("", "");
        assertThat(actualAdmin).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetAllAdmin() {
        when(adminRepository.findAll()).thenReturn(getListOfAdmin());
        final Optional<List<Admin>> allAdmin = adminService.getAllAdmin();
        assertThat(allAdmin.get().size()).isEqualTo(2);
        assertThat(allAdmin.get().get(0).getUsername()).isEqualTo("admin");
    }

    @Test
    public void testGetAllAdminFails() {
        when(adminRepository.findAll()).thenReturn(null);
        final Optional<List<Admin>> allAdmin = adminService.getAllAdmin();
        assertThat(allAdmin).isEmpty();
    }

    @Test
    public void testSaveAdmin() {
        when(adminRepository.save(admin)).thenReturn(admin);
        Optional<Admin> actualAdmin = adminService.saveAdmin(admin);
        assertThat(actualAdmin.get()).isEqualTo(admin);
    }

    @Test
    public void testSaveAdminFails() {
        when(adminRepository.save(admin)).thenReturn(null);
        Optional<Admin> actualAdmin = adminService.saveAdmin(admin);
        assertThat(actualAdmin).isEmpty();
    }

    private List<Admin> getListOfAdmin(){
        List<Admin> adminList = new ArrayList<>();
        adminList.add(Admin.adminBuilder()
                .username("admin")
                .password("1234")
                .build());
        adminList.add(Admin.adminBuilder()
                .username("admin2")
                .password("12345")
                .build());
        return adminList;
    }
}
