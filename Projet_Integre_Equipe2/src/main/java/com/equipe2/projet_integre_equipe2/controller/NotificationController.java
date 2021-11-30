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

    @PostMapping("/save-notification-for-admin")
    public ResponseEntity<Notification> saveNotificationsForAdmin(@RequestBody Notification notification) {
        return notificationService.saveNotificationsForAdmin(notification)
                .map(notification1 -> ResponseEntity.status(HttpStatus.CREATED).body(notification1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Notification()));
    }

    @PostMapping("/save-notification-for-monitor/{idMonitor}")
    public ResponseEntity<Notification> saveNotificationsForMonitor(@RequestBody Notification notification, @PathVariable int idMonitor) {
        return notificationService.saveNotificationsForMonitor(notification, idMonitor)
                .map(notification1 -> ResponseEntity.status(HttpStatus.CREATED).body(notification1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).body(new Notification()));
    }

    @GetMapping("/get-notification-student/{id}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable int id){
        return notificationService.getNotifications(id)
                .map(student1 -> ResponseEntity.status(HttpStatus.OK).body(student1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/get-notification-admin/{id}")
    public ResponseEntity<List<Notification>> getNotificationsForAdmin(@PathVariable int id){
        return notificationService.getNotificationsForAdmin(id)
                .map(admin1 -> ResponseEntity.status(HttpStatus.OK).body(admin1))
                .orElse(ResponseEntity.status(HttpStatus.CONFLICT).build());
    }

    @GetMapping("/get-notification-monitor/{id}")
    public ResponseEntity<List<Notification>> getNotificationsForMonitor(@PathVariable int id){
        return notificationService.getNotificationsForMonitor(id)
                .map(monitor1 -> ResponseEntity.status(HttpStatus.OK).body(monitor1))
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

    @DeleteMapping("/delete-notification-admin/{idNotification}")
    public Boolean deleteNotificationsForAdmin(@PathVariable int idNotification) {
        return notificationService.deleteNotificationsForAdmin(idNotification);
    }

    @DeleteMapping("/delete-all-notification-admin/{idAdmin}")
    public Boolean deleteAllNotificationsForAdmin(@PathVariable int idAdmin) {
        return notificationService.deleteAllByAdminId(idAdmin);
    }

    @DeleteMapping("/delete-notification-monitor/{idNotification}/{idMonitor}")
    public Boolean deleteNotificationsForMonitor(@PathVariable int idNotification, @PathVariable int idMonitor) {
        return notificationService.deleteNotificationsForMonitor(idNotification, idMonitor);
    }

    @DeleteMapping("/delete-all-notification-monitor/{idMonitor}")
    public Boolean deleteAllNotificationsForMonitor(@PathVariable int idMonitor) {
        return notificationService.deleteAllByMonitorId(idMonitor);
    }
}
