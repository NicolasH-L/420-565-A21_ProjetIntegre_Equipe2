package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Admin;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.mockito.Mockito.when;

@WebMvcTest(AdminController.class)
public class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AdminService adminService;

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

    @Test
    public void getAllAdminTest() throws Exception {
        List<Admin> adminList = getListOfAdmin();
        when(adminService.getAllAdmin()).thenReturn(Optional.of(adminList));

        MvcResult result = mockMvc.perform(get("/admin/get-all-admins")
                        .contentType(MediaType.APPLICATION_JSON))
                        .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(2);
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
