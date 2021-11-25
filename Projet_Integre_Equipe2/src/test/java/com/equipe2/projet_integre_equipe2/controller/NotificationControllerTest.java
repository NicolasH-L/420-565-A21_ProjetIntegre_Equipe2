package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Admin;
import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.model.Notification;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.service.NotificationService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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

@WebMvcTest(NotificationController.class)
public class NotificationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private NotificationService notificationService;

    private Notification notification;
    private Notification notificationAdmin;
    private Notification notificationMonitor;
    private Student student;
    private Monitor monitor;
    private Admin admin;

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

        monitor = Monitor.monitorBuilder()
                .id(1)
                .lastName("Lajoie")
                .firstName("Bob")
                .build();

        admin = Admin.adminBuilder()
                .id(1)
                .username("bob")
                .build();

        notification = Notification.builder()
                .id(1)
                .typeNotification("CV")
                .message("CV refuser")
                .student(Arrays.asList(student))
                .build();

        notificationAdmin = Notification.builder()
                .id(5)
                .typeNotification("Offre")
                .message("Offre deposer par un moniteur")
                .admin(admin)
                .build();

        notificationMonitor = Notification.builder()
                .id(2)
                .typeNotification("Offre")
                .message("Votre offre a ete refuser")
                .monitor(monitor)
                .build();

    }

    @Test
    public void saveNotificationForAllStudentTest() throws Exception {
        when(notificationService.saveNotificationsOffersForAllStudent(notification)).thenReturn(Optional.of(notification));

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
        when(notificationService.saveNotificationsForStudent(notification, student.getId())).thenReturn(Optional.of(notification));

        MvcResult result = mockMvc.perform(post("/notification/save-notification-for-student/" + student.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(notification))).andReturn();

        var actualNotification = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<Notification>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(notification).isEqualTo(actualNotification);
    }

    @Test
    public void saveNotificationForAdmin() throws Exception {
        when(notificationService.saveNotificationsForAdmin(notificationAdmin)).thenReturn(Optional.of(notificationAdmin));

        MvcResult result = mockMvc.perform(post("/notification/save-notification-for-admin/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(notificationAdmin))).andReturn();

        var actualNotification = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<Notification>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(notificationAdmin).isEqualTo(actualNotification);
    }

    @Test
    public void saveNotificationForMonitor() throws Exception {
        when(notificationService.saveNotificationsForMonitor(notificationMonitor, monitor.getId())).thenReturn(Optional.of(notificationMonitor));

        MvcResult result = mockMvc.perform(post("/notification/save-notification-for-monitor/" + monitor.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(notificationMonitor))).andReturn();

        var actualNotification = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<Notification>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(notificationMonitor).isEqualTo(actualNotification);
    }


    @Test
    public void getNotification() throws Exception {
        when(notificationService.getNotifications(student.getId())).thenReturn(Optional.of(getNotificationsList()));

        MvcResult result = mockMvc.perform(get("/notification/get-notification-student/" + student.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actualNotificationList = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<List<Notification>>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualNotificationList.size()).isEqualTo(1);
    }

    @Test
    public void getNotificationsForAdmin() throws Exception {
        when(notificationService.getNotificationsForAdmin(admin.getId())).thenReturn(Optional.of(getNotificationsListForAdmin()));

        MvcResult result = mockMvc.perform(get("/notification/get-notification-admin/" + admin.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actualNotificationList = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<List<Notification>>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualNotificationList.size()).isEqualTo(1);
    }

    @Test
    public void getNotificationsForMonitor() throws Exception {
        when(notificationService.getNotificationsForMonitor(monitor.getId())).thenReturn(Optional.of(getNotificationsListForMonitor()));

        MvcResult result = mockMvc.perform(get("/notification/get-notification-monitor/" + monitor.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actualNotificationList = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<List<Notification>>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualNotificationList.size()).isEqualTo(1);
    }

    @Test
    public void deleteANotificationStudent() throws Exception {
        when(notificationService.deleteNotificationsForStudent(notification.getId(), student.getId())).thenReturn(true);
        MvcResult result = mockMvc.perform(delete("/notification/delete-notification/" + notification.getId() + "/" + student.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actualDeletedNotification = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<Boolean>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualDeletedNotification).isEqualTo(true);
    }

    @Test
    public void deleteAllNotificationsStudent() throws Exception {
        when(notificationService.deleteAllByStudentId(student.getId())).thenReturn(true);
        MvcResult result = mockMvc.perform(delete("/notification/delete-notification/" + student.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actualDeletedNotification = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<Boolean>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualDeletedNotification).isEqualTo(true);
    }

    @Test
    public void deleteANotificationAdmin() throws Exception {
        when(notificationService.deleteNotificationsForAdmin(notificationAdmin.getId())).thenReturn(true);
        MvcResult result = mockMvc.perform(delete("/notification/delete-notification-admin/" + notificationAdmin.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actualDeletedNotification = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<Boolean>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualDeletedNotification).isEqualTo(true);
    }

    @Test
    public void deleteAllNotificationsAdmin() throws Exception {
        MvcResult result = mockMvc.perform(delete("/notification/delete-all-notification-admin/" + admin.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
    }

    @Test
    public void deleteANotificationMonitor() throws Exception {
        when(notificationService.deleteNotificationsForMonitor(notificationMonitor.getId(), monitor.getId())).thenReturn(true);
        MvcResult result = mockMvc.perform(delete("/notification/delete-notification-monitor/" + notificationMonitor.getId() + "/" + monitor.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actualDeletedNotification = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<Boolean>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualDeletedNotification).isEqualTo(true);
    }

    @Test
    public void deleteAllNotificationsMonitor() throws Exception {
        MvcResult result = mockMvc.perform(delete("/notification/delete-all-notification-monitor/" + monitor.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
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

    private List<Notification> getNotificationsListForMonitor() {
        List<Notification> notificationList = new ArrayList<>();
        notificationList.add(Notification.builder()
                .typeNotification("Offre")
                .message("Votre offre a ete refuser")
                .monitor(monitor)
                .build());
        return notificationList;
    }

    private List<Notification> getNotificationsListForAdmin() {
        List<Notification> notificationList = new ArrayList<>();
        notificationList.add(Notification.builder()
                .typeNotification("offre")
                .message("Offre deposer par un moniteur")
                .admin(admin)
                .build());
        return notificationList;
    }

}