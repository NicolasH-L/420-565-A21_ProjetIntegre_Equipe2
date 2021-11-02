package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Admin;
import com.equipe2.projet_integre_equipe2.model.Sessions;
import com.equipe2.projet_integre_equipe2.repository.SessionsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SessionsService {

    private SessionsRepository sessionsRepository;

    public SessionsService(SessionsRepository sessionsRepository){
        this.sessionsRepository = sessionsRepository;
    }

    public Optional<List<Sessions>> getAllSessions() {
        try {
            return Optional.of(sessionsRepository.findAll());
        } catch (Exception e) {
            return Optional.empty();
        }
    }
}
