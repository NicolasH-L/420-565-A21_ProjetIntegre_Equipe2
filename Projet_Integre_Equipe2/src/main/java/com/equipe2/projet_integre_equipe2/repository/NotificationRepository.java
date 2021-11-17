package com.equipe2.projet_integre_equipe2.repository;

import com.equipe2.projet_integre_equipe2.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> findAllByStudent_id(int id);

    /*
    void deleteNotificationStudentByIdNotificationAndStudentId(int idNotification, int idStudent);

    @Modifying
    @Query("delete from Notification n where n.student =:idStudent")
    void deleteAllByStudent_id(@Param("idStudent") int idStudent);

    boolean existsByIdNotificationAndStudent_id(int idNotification, int idStudent);
    */
}
