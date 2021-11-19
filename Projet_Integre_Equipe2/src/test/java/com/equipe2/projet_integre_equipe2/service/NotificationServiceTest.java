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
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class NotificationServiceTest {

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private NotificationService notificationService;

    @Mock
    private NotificationService notificationService2;

    @Mock
    private StudentService studentService;

    @Mock
    private List<Student> studentList = getListOfStudents();

    private Student student;

    private Notification notification;

    private Notification notification2;

    private Notification notification3;

    @BeforeEach
    void setup() {
        student = Student.studentBuilder()
                .id(1)
                .firstName("Bob")
                .lastName("Lajoie")
                .build();

        notification = Notification.builder()
                .id(1)
                .typeNotification("test")
                .message("Voici un message")
                .student(getListOfStudents())
                .build();

        notification2 = Notification.builder()
                .id(1)
                .typeNotification("test")
                .message("Voici un message")
                .student(getListOfStudentsNull())
                .build();

        notification3 = Notification.builder()
                .id(1)
                .typeNotification("test")
                .message("Voici un message")
                .student(getListOfStudents2())
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
        assertThat(actualNotification.get().getStudent().size()).isEqualTo(4);
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
        Optional<List<Notification>> actualNotificationList = notificationService.getNotifications(student.getId());
        assertThat(actualNotificationList.get().size()).isEqualTo(1);
    }

    @Test
    public void testGetNotificationFail(){
        when(notificationRepository.findAllByStudent_id(student.getId())).thenReturn(null);
        Optional<List<Notification>> actualNotificationList = notificationService.getNotifications(student.getId());
        assertThat(actualNotificationList).isEmpty();
    }

    @Test
    public void testGetMaNotification(){
        when(notificationRepository.findNotificationById(notification.getId())).thenReturn(notification);
        Optional<Notification> actualNotification = notificationService.getMaNotification(notification.getId());
        assertThat(actualNotification.get()).isEqualTo(notification);
    }

    @Test
    public void testGetMaNotificationFails(){
        when(notificationRepository.findNotificationById(notification.getId())).thenReturn(null);
        Optional<Notification> actualNotification = notificationService.getMaNotification(3);
        assertThat(actualNotification).isEqualTo(Optional.empty());
    }

    @Test
    public void testDeleteNotificationForStudent(){
        when(notificationRepository.findNotificationById(notification.getId())).thenReturn(notification);
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        when(notificationRepository.save(notification)).thenReturn(notification);
        boolean deleteNotification = notificationService.deleteNotificationForStudent(notification.getId(),student.getId());
        assertThat(deleteNotification).isTrue();
    }

    @Test
    public void testDeleteNotificationForStudentFails(){
        when(notificationRepository.findNotificationById(notification.getId())).thenReturn(null);
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        boolean deleteNotification = notificationService.deleteNotificationForStudent(notification.getId(),student.getId());
        assertThat(deleteNotification).isFalse();
    }

    @Test
    public void testDeleteAllByStudentId(){
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        when(notificationRepository.findAllByStudent_id(student.getId())).thenReturn(getNotificationsList());
        boolean deleteNotification = notificationService.deleteAllByStudentId(student.getId());
        assertThat(deleteNotification).isTrue();
    }

    @Test
    public void testDeleteAllByStudentIdFails(){
        when(studentRepository.findById(student.getId())).thenReturn(null);
        boolean deleteNotification = notificationService.deleteAllByStudentId(student.getId());
        assertThat(deleteNotification).isFalse();
    }

    @Test
    public void testDeleteAllByStudentIdListFails(){
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        when(notificationRepository.findAllByStudent_id(student.getId())).thenReturn(null);
        boolean deleteNotification = notificationService.deleteAllByStudentId(student.getId());
        assertThat(deleteNotification).isFalse();
    }

    @Test
    public void testDeleteNotificationByStudentListIsEmpty(){
        when(notificationRepository.findNotificationById(notification3.getId())).thenReturn(notification3);
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        boolean deleteNotification = notificationService.deleteNotificationForStudent(notification3.getId(),student.getId());
        assertThat(deleteNotification).isTrue();
    }

    @Test
    public void testIsStudentListIsEmpty(){
        notificationService.isStudentListIsEmpty(notification2.getId(), notification2);
        verify(notificationRepository, times(1)).deleteById(notification2.getId());
    }

    @Test
    public void testIsStudentListIsEmptyFails(){
        notificationService.isStudentListIsEmpty(notification.getId(), notification);
        verify(notificationRepository, times(0)).deleteById(notification.getId());
    }

    private List<Notification> getNotificationsList(){
        List<Notification> notificationList = new ArrayList<>();
        notificationList.add(Notification.builder()
                .id(1)
                .typeNotification("offre")
                .message("Voici un offre")
                .student(getListOfStudents())
                .build());
        return notificationList;
    }

    private List<Student> getListOfStudents() {
        List<Student> studentList = new ArrayList<>();
        studentList.add(Student.studentBuilder()
                .id(1)
                .firstName("Bob")
                .lastName("Lajoie")
                .build());
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

    private List<Student> getListOfStudents2() {
        List<Student> studentList = new ArrayList<>();
        studentList.add(student);
        return studentList;
    }

    private List<Student> getListOfStudentsNull() {
        List<Student> studentList = new ArrayList<>();
        return studentList;
    }
}
