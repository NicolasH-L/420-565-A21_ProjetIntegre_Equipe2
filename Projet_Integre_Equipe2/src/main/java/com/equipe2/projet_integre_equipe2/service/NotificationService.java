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

    public boolean deleteNotificationForStudent(int idNotification, int idStudent){
        try {
            Notification notification = notificationRepository.findNotificationById(idNotification);
            Student student = studentRepository.findById(idStudent).get();
            notification.getStudent().remove(student);
            notificationRepository.save(notification);
            isStudentListIsEmpty(idNotification, notification);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    public void isStudentListIsEmpty(int idNotification, Notification notification) {
        if(notification.getStudent().isEmpty())
            notificationRepository.deleteById(idNotification);
    }

    public boolean deleteAllByStudentId(int idStudent){
        try{
            Student student = studentRepository.findById(idStudent).get();
            for (Notification notification: notificationRepository.findAllByStudent_id(idStudent)) {
                notification.getStudent().remove(student);
                notificationRepository.save(notification);
                isStudentListIsEmpty(notification.getId(), notification);
            }
            return notificationRepository.findAll().size() == 0;
        }catch (Exception e){
            return false;
        }
    }

}
