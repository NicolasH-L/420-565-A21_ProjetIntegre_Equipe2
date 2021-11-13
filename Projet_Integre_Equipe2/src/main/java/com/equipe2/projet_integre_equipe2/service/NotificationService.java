package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Notification;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.NotificationRepository;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private NotificationRepository notificationRepository;
    private StudentRepository studentRepository;

    public NotificationService(NotificationRepository notificationRepository, StudentRepository studentRepository){
        this.notificationRepository = notificationRepository;
        this.studentRepository = studentRepository;
    }

    public Optional<Notification> saveNotificationForOfferForAllStudent(Notification notification){
        try {
            List<Student> validStudentList = studentRepository.findAllByIsCvValidTrue();
            notification.setStudent(validStudentList);
            return Optional.of(notificationRepository.save(notification));
        } catch (Exception e){
            return Optional.empty();
        }
    }

    public Optional<Notification> saveNotificationForStudent(Notification notification, int idStudent){
        try {
            Student student = studentRepository.findById(idStudent).get();
            notification.setStudent(Arrays.asList(student));
            return Optional.of(notificationRepository.save(notification));
        } catch (Exception e){
            return Optional.empty();
        }
    }

    public Optional<List<Notification>> getNotification(int id){
        try {
            return Optional.of(notificationRepository.findAllByStudent_id(id));
        } catch (Exception e){
            return Optional.empty();
        }
    }
}
