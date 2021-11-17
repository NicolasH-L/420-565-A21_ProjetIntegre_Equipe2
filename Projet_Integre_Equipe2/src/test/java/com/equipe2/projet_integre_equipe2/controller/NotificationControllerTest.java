package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Notification;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.service.NotificationService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.spi.ObjectThreadContextMap;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(NotificationController.class)
public class NotificationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private NotificationService notificationService;

    private Notification notification;
    private Student student;

    @BeforeEach
    void setup() {
        student = Student.studentBuilder()
                .id(1)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .isCvValid(true)
                .build();

        notification = Notification.builder()
                .idNotification(1)
                .typeNotification("CV")
                .message("CV refuser")
                .student(Arrays.asList(student))
                .build();
    }

    @Test
    public void saveNotificationForAllStudentTest() throws Exception {
        when(notificationService.saveNotificationForOfferForAllStudent(notification)).thenReturn(Optional.of(notification));

        MvcResult result = mockMvc.perform(post("/notification/save-notification")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(notification))).andReturn();

        var actualNotification = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<Notification>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(notification).isEqualTo(actualNotification);
    }

    @Test
    public void saveNotificationForStudent() throws Exception {
        when(notificationService.saveNotificationForStudent(notification, student.getId())).thenReturn(Optional.of(notification));

        MvcResult result = mockMvc.perform(post("/notification/save-notification-for-student/" + student.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(notification))).andReturn();

        var actualNotification = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<Notification>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(notification).isEqualTo(actualNotification);
    }

    @Test
    public void getNotification() throws Exception {
        when(notificationService.getNotification(student.getId())).thenReturn(Optional.of(getNotificationsList()));

        MvcResult result = mockMvc.perform(get("/notification/get-notification-student/" + student.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actualNotificationList = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<List<Notification>>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualNotificationList.size()).isEqualTo(1);
    }

    @Test
    public void deleteNotification() throws Exception {
        when(notificationService.deleteNotificationForStudent(notification.getIdNotification(), student.getId())).thenReturn(true);
        MvcResult result = mockMvc.perform(delete("/notification/delete-notification/" + notification.getIdNotification() + "/" + student.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actualDeletedNotification = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<Boolean>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualDeletedNotification).isEqualTo(true);
    }

    private List<Notification> getNotificationsList() {
        List<Notification> notificationList = new ArrayList<>();
        notificationList.add(Notification.builder()
                .typeNotification("offre")
                .message("Voici un offre")
                .student(Arrays.asList(student))
                .build());
        return notificationList;
    }
}