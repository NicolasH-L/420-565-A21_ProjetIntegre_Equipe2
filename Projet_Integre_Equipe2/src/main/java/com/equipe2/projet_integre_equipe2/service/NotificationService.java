package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Admin;
import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.model.Notification;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.AdminRepository;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
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
    private AdminRepository adminRepository;
    private MonitorRepository monitorRepository;

    public NotificationService(NotificationRepository notificationRepository, StudentRepository studentRepository,
                               AdminRepository adminRepository, MonitorRepository monitorRepository) {
        this.notificationRepository = notificationRepository;
        this.studentRepository = studentRepository;
        this.adminRepository = adminRepository;
        this.monitorRepository = monitorRepository;
    }

    public Optional<Notification> saveNotificationsOffersForAllStudent(Notification notification) {
        try {
            List<Student> validStudentList = studentRepository.findAllByIsCvValidTrue();
            notification.setStudent(validStudentList);
            return Optional.of(notificationRepository.save(notification));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Notification> saveNotificationsForStudent(Notification notification, int idStudent) {
        try {
            Student student = studentRepository.findById(idStudent).get();
            notification.setStudent(Arrays.asList(student));
            return Optional.of(notificationRepository.save(notification));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Notification> saveNotificationsForAdmin(Notification notification) {
        try {
            Admin admin = adminRepository.findById(1).get();
            notification.setAdmin(admin);
            return Optional.of(notificationRepository.save(notification));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Notification> saveNotificationsForMonitor(Notification notification, int idMonitor) {
        try {
            Monitor monitor = monitorRepository.findById(idMonitor).get();
            notification.setMonitor(monitor);
            return Optional.of(notificationRepository.save(notification));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Notification>> getNotifications(int id) {
        try {
            return Optional.of(notificationRepository.findAllByStudent_id(id));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Notification>> getNotificationsForAdmin(int id) {
        try {
            return Optional.of(notificationRepository.findAllByAdmin_Id(id));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<List<Notification>> getNotificationsForMonitor(int id) {
        try {
            return Optional.of(notificationRepository.findAllByMonitor_Id(id));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public boolean deleteNotificationsForStudent(int idNotification, int idStudent) {
        try {
            Notification notification = notificationRepository.findNotificationById(idNotification);
            Student student = studentRepository.findById(idStudent).get();
            notification.getStudent().remove(student);
            notificationRepository.save(notification);
            studentListEmptyValidation(idNotification, notification);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public void studentListEmptyValidation(int idNotification, Notification notification) {
        if (notification.getStudent().isEmpty())
            notificationRepository.deleteById(idNotification);
    }

    public boolean deleteAllByStudentId(int idStudent) {
        try {
            Student student = studentRepository.findById(idStudent).get();
            for (Notification notification : notificationRepository.findAllByStudent_id(idStudent)) {
                notification.getStudent().remove(student);
                notificationRepository.save(notification);
                studentListEmptyValidation(notification.getId(), notification);
            }
            return notificationRepository.findAll().size() == 0;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean deleteNotificationsForAdmin(int idNotification) {
        try {
            Notification notification = notificationRepository.findNotificationById(idNotification);
            notificationRepository.deleteById(notification.getId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean deleteAllByAdminId(int idAdmin) {
        try {
            for (Notification notification : notificationRepository.findAllByAdmin_Id(idAdmin))
                notificationRepository.deleteById(notification.getId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean deleteNotificationsForMonitor(int idNotification, int idMonitor) {
        try {
            Notification notification = notificationRepository.findByIdAndMonitor_Id(idNotification, idMonitor);
            notificationRepository.deleteById(notification.getId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean deleteAllByMonitorId(int idMonitor) {
        try {
            for (Notification notification : notificationRepository.findAllByMonitor_Id(idMonitor))
                notificationRepository.deleteById(notification.getId());
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
