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

    public Optional<List<Notification>> getNotifications(int id){
        try {
            return Optional.of(notificationRepository.findAllByStudent_id(id));
        } catch (Exception e){
            return Optional.empty();
        }
    }

    public Optional<Notification> getMaNotification(int id){
        try {
            return Optional.of(notificationRepository.findNotificationById(id));
        } catch (Exception e){
            return Optional.empty();
        }
    }

    //TODO Faire le test de suppresion par l'id de la notification et l'id du student
    public boolean deleteNotificationForStudent(int idNotification, int idStudent){
        try {
            Notification notification = getMaNotification(idNotification).get();
            Student student = studentRepository.findById(idStudent).get();
            notification.getStudent().remove(student);
            notificationRepository.save(notification);
//            notificationRepository.deleteNotificationByIdAndStudent_id(notification.getId(), idStudent);
            return notificationRepository.existsByIdAndStudent_id(idNotification, idStudent);
        } catch (Exception e){
            return false;
        }
    }

    //TODO Faire le test de suppression par l'id du student
    public boolean deleteAllByStudentId(int idStudent){
        try{
            Student student = studentRepository.findById(idStudent).get();
            for (Notification notification: notificationRepository.findAllByStudent_id(idStudent)) {
                notification.getStudent().remove(student);
                notificationRepository.save(notification);
            }
            return notificationRepository.findAll().size() == 0;
        }catch (Exception e){
            return false;
        }
    }
}
