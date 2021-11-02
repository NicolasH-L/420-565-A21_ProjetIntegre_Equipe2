package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Admin;
import com.equipe2.projet_integre_equipe2.model.Sessions;
import com.equipe2.projet_integre_equipe2.repository.SessionsRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SessionsServiceTest {

    @Mock
    private SessionsRepository sessionsRepository;

    @InjectMocks
    private SessionsService sessionsService;

    @Test
    public void testGetAllSessions() {
        when(sessionsRepository.findAll()).thenReturn(getListOfSessions());
        final Optional<List<Sessions>> allSessions = sessionsService.getAllSessions();
        assertThat(allSessions.get().size()).isEqualTo(2);
        assertThat(allSessions.get().get(0).getSession()).isEqualTo("winter2022");
    }

    @Test
    public void testGetAllSessionsFails() {
        when(sessionsRepository.findAll()).thenReturn(null);
        final Optional<List<Sessions>> allSessions = sessionsService.getAllSessions();
        assertThat(allSessions).isEmpty();
    }

    private List<Sessions> getListOfSessions(){
        List<Sessions> sessionsList = new ArrayList<>();
        sessionsList.add(Sessions.builder()
                .idSession(1)
                .session("winter2022")
                .build());
        sessionsList.add(Sessions.builder()
                .idSession(2)
                .session("summer2022")
                .build());

        return sessionsList;
    }
}
