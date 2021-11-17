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
    public ResponseEntity<Notification> saveNotificationForOfferForAllStudent(@RequestBody Notification notification) {
        return notificationService.saveNotificationForOfferForAllStudent(notification)
                .map(notification1 -> ResponseEntity.status(HttpStatus.CREATED).body(notification1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Notification()));
    }

    @PostMapping("/save-notification-for-student/{idStudent}")
    public ResponseEntity<Notification> saveNotificationForStudent(@RequestBody Notification notification, @PathVariable int idStudent) {
        return notificationService.saveNotificationForStudent(notification, idStudent)
                .map(notification1 -> ResponseEntity.status(HttpStatus.CREATED).body(notification1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Notification()));
    }

    @GetMapping("/get-notification-student/{id}")
    public ResponseEntity<List<Notification>> getNotification(@PathVariable int id){
        return notificationService.getNotification(id)
                .map(student1 -> ResponseEntity.status(HttpStatus.OK).body(student1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    /*
    @DeleteMapping("/delete-notification/{idNotification}/{idStudent}")
    public Boolean deleteNotificationForStudent(@PathVariable int idNotification, @PathVariable int idStudent) {
        return notificationService.deleteNotificationForStudent(idNotification, idStudent);
    }

    @DeleteMapping("/delete-notification/{idStudent}")
    public Boolean deleteAllNotificationForStudent(@PathVariable int idStudent) {
        return notificationService.deleteAllByStudentId(idStudent);
    }*/

}
