package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Admin;
import com.equipe2.projet_integre_equipe2.model.Monitor;
import com.equipe2.projet_integre_equipe2.model.Notification;
import com.equipe2.projet_integre_equipe2.model.Student;
import com.equipe2.projet_integre_equipe2.repository.AdminRepository;
import com.equipe2.projet_integre_equipe2.repository.MonitorRepository;
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

    @Mock
    private MonitorRepository monitorRepository;

    @Mock
    private AdminRepository adminRepository;

    @InjectMocks
    private NotificationService notificationService;

    private Student student;

    private Monitor monitor;

    private Admin admin;

    private Notification notification;

    private Notification notification2;

    private Notification notification3;

    private Notification notificationAdmin;

    private Notification notificationMonitor;

    @BeforeEach
    void setup() {
        student = Student.studentBuilder()
                .id(1)
                .firstName("Bob")
                .lastName("Lajoie")
                .build();

        admin = Admin.adminBuilder()
                .id(1)
                .username("bob")
                .build();

        monitor = Monitor.monitorBuilder()
                .id(1)
                .lastName("Lajoie")
                .firstName("Bob")
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

        notificationAdmin = Notification.builder()
                .id(1)
                .typeNotification("Offre deposer")
                .message("Offre deposer par un moniteur")
                .admin(admin)
                .build();

        notificationMonitor = Notification.builder()
                .id(1)
                .typeNotification("Offre")
                .message("Votre offre a ete refuse")
                .monitor(monitor)
                .build();
    }

    @Test
    public void testCreateNotificationsForStudent() {
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        when(notificationRepository.save(notification)).thenReturn(notification);
        Optional<Notification> actualNotification = notificationService.saveNotificationsForStudent(notification, student.getId());
        assertThat(actualNotification.get()).isEqualTo(notification);
    }

    @Test
    public void testCreateNotificationsForStudentFails() {
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        when(notificationRepository.save(notification)).thenReturn(null);
        Optional<Notification> actualNotification = notificationService.saveNotificationsForStudent(notification, student.getId());
        assertThat(actualNotification).isEqualTo(Optional.empty());
    }

    @Test
    public void testCreateNotificationsForAllStudent() {
        when(studentRepository.findAllByIsCvValidTrue()).thenReturn(getListOfStudents());
        when(notificationRepository.save(notification)).thenReturn(notification);
        Optional<Notification> actualNotification = notificationService.saveNotificationsOffersForAllStudent(notification);
        assertThat(actualNotification.get().getStudent().size()).isEqualTo(4);
    }

    @Test
    public void testCreateNotificationsForAllStudentFails() {
        when(studentRepository.findAllByIsCvValidTrue()).thenReturn(getListOfStudents());
        when(notificationRepository.save(notification)).thenReturn(null);
        Optional<Notification> actualNotification = notificationService.saveNotificationsOffersForAllStudent(notification);
        assertThat(actualNotification).isEmpty();
    }

    @Test
    public void testCreateNotificationsForAdmin() {
        when(adminRepository.findById(admin.getId())).thenReturn(Optional.of(admin));
        when(notificationRepository.save(notificationAdmin)).thenReturn(notificationAdmin);
        Optional<Notification> actualNotification = notificationService.saveNotificationsForAdmin(notificationAdmin);
        assertThat(actualNotification.get()).isEqualTo(notificationAdmin);
    }

    @Test
    public void testCreateNotificationsForAdminFails() {
        when(adminRepository.findById(admin.getId())).thenReturn(Optional.of(admin));
        when(notificationRepository.save(notificationAdmin)).thenReturn(null);
        Optional<Notification> actualNotification = notificationService.saveNotificationsForAdmin(notificationAdmin);
        assertThat(actualNotification).isEqualTo(Optional.empty());
    }

    @Test
    public void testCreateNotificationsForMonitor() {
        when(monitorRepository.findById(monitor.getId())).thenReturn(Optional.of(monitor));
        when(notificationRepository.save(notificationMonitor)).thenReturn(notificationMonitor);
        Optional<Notification> actualNotification = notificationService.saveNotificationsForMonitor(notificationMonitor, monitor.getId());
        assertThat(actualNotification.get()).isEqualTo(notificationMonitor);
    }

    @Test
    public void testCreateNotificationsForMonitorFails() {
        when(monitorRepository.findById(monitor.getId())).thenReturn(Optional.of(monitor));
        when(notificationRepository.save(notificationMonitor)).thenReturn(null);
        Optional<Notification> actualNotification = notificationService.saveNotificationsForMonitor(notificationMonitor, monitor.getId());
        assertThat(actualNotification).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetNotifications() {
        when(notificationRepository.findAllByStudent_id(student.getId())).thenReturn(getNotificationsList());
        Optional<List<Notification>> actualNotificationList = notificationService.getNotifications(student.getId());
        assertThat(actualNotificationList.get().size()).isEqualTo(1);
    }

    @Test
    public void testGetNotificationsFails() {
        when(notificationRepository.findAllByStudent_id(student.getId())).thenReturn(null);
        Optional<List<Notification>> actualNotificationList = notificationService.getNotifications(student.getId());
        assertThat(actualNotificationList).isEmpty();
    }

    @Test
    public void testGetNotificationsForAdmin() {
        when(notificationRepository.findAllByAdmin_Id(admin.getId())).thenReturn(getNotificationsListAdmin());
        Optional<List<Notification>> actualNotification = notificationService.getNotificationsForAdmin(admin.getId());
        assertThat(actualNotification.get().size()).isEqualTo(1);
    }

    @Test
    public void testGetNotificationsForAdminFails() {
        when(notificationRepository.findAllByAdmin_Id(admin.getId())).thenReturn(null);
        Optional<List<Notification>> actualNotification = notificationService.getNotificationsForAdmin(admin.getId());
        assertThat(actualNotification).isEmpty();
    }

    @Test
    public void testGetNotificationsForMonitor() {
        when(notificationRepository.findAllByMonitor_Id(monitor.getId())).thenReturn(getListNotificationsForMonitor());
        Optional<List<Notification>> actualNotification = notificationService.getNotificationsForMonitor(monitor.getId());
        assertThat(actualNotification.get().size()).isEqualTo(1);
    }

    @Test
    public void testGetNotificationsForMonitorFails() {
        when(notificationRepository.findAllByMonitor_Id(monitor.getId())).thenReturn(null);
        Optional<List<Notification>> actualNotification = notificationService.getNotificationsForMonitor(monitor.getId());
        assertThat(actualNotification).isEmpty();
    }

    @Test
    public void testDeleteNotificationsForStudent() {
        when(notificationRepository.findNotificationById(notification.getId())).thenReturn(notification);
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        when(notificationRepository.save(notification)).thenReturn(notification);
        boolean deleteNotification = notificationService.deleteNotificationsForStudent(notification.getId(), student.getId());
        assertThat(deleteNotification).isTrue();
    }

    @Test
    public void testDeleteNotificationsForStudentFails() {
        when(notificationRepository.findNotificationById(notification.getId())).thenReturn(null);
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        boolean deleteNotification = notificationService.deleteNotificationsForStudent(notification.getId(), student.getId());
        assertThat(deleteNotification).isFalse();
    }

    @Test
    public void testDeleteAllByStudentId() {
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        when(notificationRepository.findAllByStudent_id(student.getId())).thenReturn(getNotificationsList());
        boolean deleteNotification = notificationService.deleteAllByStudentId(student.getId());
        assertThat(deleteNotification).isTrue();
    }

    @Test
    public void testDeleteAllByStudentIdFails() {
        when(studentRepository.findById(student.getId())).thenReturn(null);
        boolean deleteNotification = notificationService.deleteAllByStudentId(student.getId());
        assertThat(deleteNotification).isFalse();
    }

    @Test
    public void testDeleteAllByStudentIdListFails() {
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        when(notificationRepository.findAllByStudent_id(student.getId())).thenReturn(null);
        boolean deleteNotification = notificationService.deleteAllByStudentId(student.getId());
        assertThat(deleteNotification).isFalse();
    }

    @Test
    public void testDeleteNotificationsByStudentListIsEmpty() {
        when(notificationRepository.findNotificationById(notification3.getId())).thenReturn(notification3);
        when(studentRepository.findById(student.getId())).thenReturn(Optional.of(student));
        boolean deleteNotification = notificationService.deleteNotificationsForStudent(notification3.getId(), student.getId());
        assertThat(deleteNotification).isTrue();
    }

    @Test
    public void testIsStudentListIsEmpty() {
        notificationService.studentListEmptyValidation(notification2.getId(), notification2);
        verify(notificationRepository, times(1)).deleteById(notification2.getId());
    }

    @Test
    public void testIsStudentListIsEmptyFails() {
        notificationService.studentListEmptyValidation(notification.getId(), notification);
        verify(notificationRepository, times(0)).deleteById(notification.getId());
    }

    @Test
    public void testDeleteNotificationsForAdmin() {
        when(notificationRepository.findNotificationById(notificationAdmin.getId())).thenReturn(notificationAdmin);
        boolean deleteNotification = notificationService.deleteNotificationsForAdmin(notificationAdmin.getId());
        assertThat(deleteNotification).isTrue();
    }

    @Test
    public void testDeleteNotificationsForAdminFails() {
        when(notificationRepository.findNotificationById(5)).thenReturn(null);
        boolean deleteNotification = notificationService.deleteNotificationsForAdmin(notificationAdmin.getId());
        assertThat(deleteNotification).isFalse();
    }

    @Test
    public void testDeleteAllByAdminId() {
        when(notificationRepository.findAllByAdmin_Id(admin.getId())).thenReturn(getNotificationsListAdmin());
        boolean deleteNotification = notificationService.deleteAllByAdminId(admin.getId());
        assertThat(deleteNotification).isTrue();
    }

    @Test
    public void testDeleteAllByAdminIdFails() {
        when(notificationRepository.findAllByAdmin_Id(admin.getId())).thenReturn(null);
        boolean deleteNotification = notificationService.deleteAllByAdminId(admin.getId());
        assertThat(deleteNotification).isFalse();
    }

    @Test
    public void testDeleteNotificationsForMonitor() {
        when(notificationRepository.findByIdAndMonitor_Id(notification.getId(), monitor.getId())).thenReturn(notificationMonitor);
        boolean deleteNotification = notificationService.deleteNotificationsForMonitor(notificationMonitor.getId(), monitor.getId());
        assertThat(deleteNotification).isTrue();
    }

    @Test
    public void testDeleteNotificationsForMonitorFails() {
        when(notificationRepository.findByIdAndMonitor_Id(notification.getId(), monitor.getId())).thenReturn(null);
        boolean deleteNotification = notificationService.deleteNotificationsForMonitor(notificationMonitor.getId(), monitor.getId());
        assertThat(deleteNotification).isFalse();
    }

    @Test
    public void testDeleteAllByMonitorId() {
        when(notificationRepository.findAllByMonitor_Id(monitor.getId())).thenReturn(getListNotificationsForMonitor());
        boolean deleteNotification = notificationService.deleteAllByMonitorId(monitor.getId());
        assertThat(deleteNotification).isTrue();
    }

    @Test
    public void testDeleteAllByMonitorIdFails() {
        when(notificationRepository.findAllByMonitor_Id(monitor.getId())).thenReturn(null);
        boolean deleteNotification = notificationService.deleteAllByMonitorId(monitor.getId());
        assertThat(deleteNotification).isFalse();
    }

    private List<Notification> getNotificationsList() {
        List<Notification> notificationList = new ArrayList<>();
        notificationList.add(Notification.builder()
                .id(1)
                .typeNotification("offre")
                .message("Voici un offre")
                .student(getListOfStudents())
                .build());
        return notificationList;
    }

    private List<Notification> getListNotificationsForMonitor() {
        List<Notification> notificationList = new ArrayList<>();
        notificationList.add(Notification.builder()
                .id(1)
                .typeNotification("Offre")
                .message("Votre offre a ete refuser")
                .monitor(monitor)
                .build());
        return notificationList;
    }

    private List<Notification> getNotificationsListAdmin() {
        List<Notification> notificationList = new ArrayList<>();
        notificationList.add(Notification.builder()
                .id(1)
                .typeNotification("offre")
                .message("Voici un offre")
                .admin(admin)
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
