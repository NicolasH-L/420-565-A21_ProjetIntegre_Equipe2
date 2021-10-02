package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Supervisor;
import com.equipe2.projet_integre_equipe2.repository.SupervisorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SupervisorServiceTest {

    @Mock
    private SupervisorRepository supervisorRepository;

    @InjectMocks
    private SupervisorService supervisorService;

    private Supervisor supervisor;

    @BeforeEach
    void setup() {
        supervisor = Supervisor.supervisorBuilder()
                .firstName("toto")
                .lastName("toto")
                .matricule("1234567")
                .password("toto1!")
                .build();
    }

    @Test
    public void testRegisterSupervisor() {
        Supervisor expected = supervisor;
        when(supervisorRepository.save(expected)).thenReturn(expected);
        Optional<Supervisor> actualSupervisor = supervisorService.registerSupervisor(expected);
        assertThat(actualSupervisor.get()).isEqualTo(expected);
    }

    @Test
    public void testRegisterDuplicateSupervisorFails() {
        when(supervisorRepository.save(any())).thenReturn(supervisor).thenReturn(Optional.empty());
        supervisorService.registerSupervisor(supervisor);
        assertThat(supervisorService.registerSupervisor(supervisor)).isEmpty();
    }

    @Test
    public void testLoginSupervisor() {
        when(supervisorRepository.findByMatriculeAndPassword(supervisor.getMatricule(), supervisor.getPassword())).thenReturn(supervisor);
        Optional<Supervisor> actualSupervisor = supervisorService.loginSupervisor(supervisor.getMatricule(), supervisor.getPassword());
        assertThat(actualSupervisor.get()).isEqualTo(supervisor);
    }

    @Test
    public void testLoginSupervisorFails() {
        when(supervisorRepository.findByMatriculeAndPassword("", "")).thenReturn(null);
        Optional<Supervisor> actualSupervisor = supervisorService.loginSupervisor("", "");
        assertThat(actualSupervisor).isEqualTo(Optional.empty());
    }
}
