package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.Notification;
import com.equipe2.projet_integre_equipe2.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/notification")
public class NotificationController {

    private NotificationService notificationService;

    public NotificationController(NotificationService notificationService){this.notificationService = notificationService;}

    @PostMapping("/save-notification")
    public ResponseEntity<Notification> saveNotificationsOffersForAllStudent(@RequestBody Notification notification) {
        return notificationService.saveNotificationsOffersForAllStudent(notification)
                .map(notification1 -> ResponseEntity.status(HttpStatus.CREATED).body(notification1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Notification()));
    }

    @PostMapping("/save-notification-for-student/{idStudent}")
    public ResponseEntity<Notification> saveNotificationsForStudent(@RequestBody Notification notification, @PathVariable int idStudent) {
        return notificationService.saveNotificationsForStudent(notification, idStudent)
                .map(notification1 -> ResponseEntity.status(HttpStatus.CREATED).body(notification1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Notification()));
    }

    @GetMapping("/get-notification-student/{id}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable int id){
        return notificationService.getNotifications(id)
                .map(student1 -> ResponseEntity.status(HttpStatus.OK).body(student1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @DeleteMapping("/delete-notification/{idNotification}/{idStudent}")
    public Boolean deleteNotificationsForStudent(@PathVariable int idNotification, @PathVariable int idStudent) {
        return notificationService.deleteNotificationsForStudent(idNotification, idStudent);
    }

    @DeleteMapping("/delete-notification/{idStudent}")
    public Boolean deleteAllNotificationsForStudent(@PathVariable int idStudent) {
        return notificationService.deleteAllByStudentId(idStudent);
    }

}
