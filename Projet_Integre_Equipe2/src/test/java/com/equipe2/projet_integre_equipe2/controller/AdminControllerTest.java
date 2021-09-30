package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Admin;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.AdminRepository;
import com.equipe2.projet_integre_equipe2.service.AdminService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(AdminController.class)
public class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AdminService adminService;

    @MockBean
    private AdminRepository adminRepository;

    private Admin admin;

    @BeforeEach
    void setup(){
        admin = Admin.adminBuilder()
                .username("username")
                .password("password")
                .build();
    }

    @Test
    public void loginAdminTest() throws Exception {
        when(adminService.login(admin.getUsername(),admin.getPassword())).thenReturn(Optional.of(admin));
        MvcResult result = mockMvc.perform(get("/admin/username/password")
                .contentType(MediaType.APPLICATION_JSON))
                .andReturn();
        var actualAdmin = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Admin.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualAdmin).isEqualTo(admin);
    }
}
