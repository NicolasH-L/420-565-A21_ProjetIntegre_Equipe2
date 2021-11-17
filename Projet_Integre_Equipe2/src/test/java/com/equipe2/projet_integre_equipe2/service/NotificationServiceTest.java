package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Notification;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.NotificationRepository;
import com.equipe2.projet_integre_equipe2.repository.StudentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class NotificationServiceTest {

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private NotificationService notificationService;

    private Student student;

    private Notification notification;

    @BeforeEach
    void setup() {
        student = Student.studentBuilder()
                .id(1)
                .firstName("Bob")
                .lastName("Lajoie")
                .build();

        notification = Notification.builder()
                .idNotification(1)
                .typeNotification("test")
                .message("Voici un message")
                .student(Arrays.asList(student))
                .build();
    }

    @Test
    public void testCreateNotificationForStudent(){
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        when(notificationRepository.save(notification)).thenReturn(notification);
        Optional<Notification> actualNotification = notificationService.saveNotificationForStudent(notification, student.getId());
        assertThat(actualNotification.get()).isEqualTo(notification);
    }

    @Test
    public void testCreateNotificationForStudentFails(){
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        when(notificationRepository.save(notification)).thenReturn(null);
        Optional<Notification> actualNotification = notificationService.saveNotificationForStudent(notification,student.getId());
        assertThat(actualNotification).isEqualTo(Optional.empty());
    }

    @Test
    public void testCreateNotificationForAllStudent(){
        when(studentRepository.findAllByIsCvValidTrue()).thenReturn(getListOfStudents());
        when(notificationRepository.save(notification)).thenReturn(notification);
        Optional<Notification> actualNotification = notificationService.saveNotificationForOfferForAllStudent(notification);
        assertThat(actualNotification.get().getStudent().size()).isEqualTo(3);

    }

    @Test
    public void testCreateNotificationForAllStudenFail(){
        when(studentRepository.findAllByIsCvValidTrue()).thenReturn(getListOfStudents());
        when(notificationRepository.save(notification)).thenReturn(null);
        Optional<Notification> actualNotification = notificationService.saveNotificationForOfferForAllStudent(notification);
        assertThat(actualNotification).isEmpty();
    }

    @Test
    public void testGetNotification(){
        when(notificationRepository.findAllByStudent_id(student.getId())).thenReturn(getNotificationsList());
        Optional<List<Notification>> actualNotificationList = notificationService.getNotification(student.getId());
        assertThat(actualNotificationList.get().size()).isEqualTo(1);
    }

    @Test
    public void testGetNotificationFail(){
        when(notificationRepository.findAllByStudent_id(student.getId())).thenReturn(null);
        Optional<List<Notification>> actualNotificationList = notificationService.getNotification(student.getId());
        assertThat(actualNotificationList).isEmpty();
    }

    /*
    @Test
    public void testDeleteNotificationByIdAndStudentId(){
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        when(notificationRepository.save(notification)).thenReturn(notification);
        Optional<Notification> actualNotification = notificationService.saveNotificationForStudent(notification, student.getId());
        assertThat(actualNotification.get()).isEqualTo(notification);

//        when(notificationRepository.deleteNotificationByIdNotificationAndStudent_id(student.getId(), notification.getIdNotification())).thenReturn(true);
        boolean deleteNotification = notificationService.deleteNotificationForStudent(notification.getIdNotification(), student.getId());
        assertThat(deleteNotification).isTrue();
    }

    @Test
    public void testDeleteNotificationByIdAndStudentIdFails(){
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        when(notificationRepository.save(notification)).thenReturn(notification);
        Optional<Notification> actualNotification = notificationService.saveNotificationForStudent(notification, student.getId());
        assertThat(actualNotification.get()).isEqualTo(notification);

//        when(notificationRepository.deleteNotificationByIdNotificationAndStudent_id(1, 2)).thenReturn(false);
        boolean deleteNotification = notificationService.deleteNotificationForStudent(10, 20);
        assertThat(deleteNotification).isFalse();
    }*/

    private List<Notification> getNotificationsList(){
        List<Notification> notificationList = new ArrayList<>();
        notificationList.add(Notification.builder()
                .typeNotification("offre")
                .message("Voici un offre")
                .student(Arrays.asList(student))
                .build());
        return notificationList;
    }

    private List<Student> getListOfStudents() {
        List<Student> studentList = new ArrayList<>();
        studentList.add(Student.studentBuilder()
                .id(2)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .isCvValid(true)
                .build());
        studentList.add(Student.studentBuilder()
                .id(3)
                .firstName("Lolo")
                .lastName("Lala")
                .matricule("1234568")
                .password("1235")
                .isCvValid(true)
                .build());
        studentList.add(Student.studentBuilder()
                .id(4)
                .firstName("Lulu")
                .lastName("Tutu")
                .matricule("1234569")
                .password("1236")
                .isCvValid(true)
                .build());
        return studentList;
    }
}
