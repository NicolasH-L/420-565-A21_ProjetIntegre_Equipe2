package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Supervisor;
import com.equipe2.projet_integre_equipe2.repository.SupervisorRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DuplicateKeyException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.assertj.core.api.Assertions.assertThat;
import java.util.Optional;


@ExtendWith(MockitoExtension.class)
public class SupervisorServiceTest {

    @Mock
    private SupervisorRepository supervisorRepository;

    @InjectMocks
    private SupervisorService supervisorService;

    private Supervisor supervisor = Supervisor.supervisorBuilder()
            .firstName("toto")
            .lastName("toto")
            .matricule("1234567")
            .password("toto1!")
            .build();

    @Test
    public void testRegisterSupervisor() {
        //Arrange
        Supervisor expected = supervisor;
        when(supervisorRepository.save(expected)).thenReturn(expected);
        //Act
        Optional<Supervisor> actualSupervisor = supervisorService.registerSupervisor(expected);
        //Assert
        assertThat(actualSupervisor.get()).isEqualTo(expected);
    }

    @Test
    public void testRegisterDuplicateSupervisorFails() {
        //Arrange
        when(supervisorRepository.save(any())).thenReturn(supervisor).thenReturn(Optional.empty());
        //Act
        supervisorService.registerSupervisor(supervisor);
        //Assert
        assertThat(supervisorService.registerSupervisor(supervisor)).isEmpty();
    }
}
