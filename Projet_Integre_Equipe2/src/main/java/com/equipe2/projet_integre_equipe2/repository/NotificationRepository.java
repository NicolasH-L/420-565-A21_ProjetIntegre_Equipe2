package com.equipe2.projet_integre_equipe2.repository;

import com.equipe2.projet_integre_equipe2.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    Notification findNotificationById(int id);

    Notification findByIdAndMonitor_Id(int idNotification, int idMonitor);

    List<Notification> findAllByStudent_id(int id);

    List<Notification> findAllByAdmin_Id(int id);

    List<Notification> findAllByMonitor_Id(int id);

}
