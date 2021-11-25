package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Supervisor;
import com.equipe2.projet_integre_equipe2.repository.SupervisorRepository;
import com.equipe2.projet_integre_equipe2.security.PasswordService;
import net.bytebuddy.implementation.bind.annotation.Super;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
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
    private Supervisor supervisorRegistered;
    private PasswordService passwordService;
    private String rawPassword = "toto1!";

    @BeforeEach
    void setup() {
        passwordService = new PasswordService();
        String encodedPassword = passwordService.encodePassword(rawPassword);
        supervisor = Supervisor.supervisorBuilder()
                .id(1)
                .firstName("toto")
                .lastName("toto")
                .matricule("1234567")
                .password(rawPassword)
                .build();

        supervisorRegistered = Supervisor.supervisorBuilder()
                .id(1)
                .firstName("toto")
                .lastName("toto")
                .matricule("1234567")
                .password(encodedPassword)
                .build();
    }

    @Test
    public void testRegisterSupervisor() {
        Supervisor expected = supervisor;
        when(supervisorRepository.save(expected)).thenReturn(supervisorRegistered);
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
        when(supervisorRepository.findByMatricule(supervisor.getMatricule())).thenReturn(supervisorRegistered);
        Optional<Supervisor> actualSupervisor = supervisorService.loginSupervisor(supervisor.getMatricule(), supervisor.getPassword());
        assertThat(actualSupervisor.get()).isEqualTo(supervisor);
    }

    @Test
    public void testLoginSupervisorFails() {
        when(supervisorRepository.findByMatricule(null)).thenReturn(null);
        Optional<Supervisor> actualSupervisor = supervisorService.loginSupervisor(null ,null);
        assertThat(actualSupervisor).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetAllSupervisors(){
        when(supervisorRepository.findAll()).thenReturn(getListOfSupervisors());
        final Optional<List<Supervisor>> allSupervisors = supervisorService.getAllSupervisors();
        assertThat(allSupervisors.get().size()).isEqualTo(3);
        assertThat(allSupervisors.get().get(0).getMatricule()).isEqualTo("1234567");
    }

    @Test
    public void testGetAllSupervisorsFails(){
        when(supervisorRepository.findAll()).thenReturn(null);
        final Optional<List<Supervisor>> allSupervisors = supervisorService.getAllSupervisors();
        assertThat(allSupervisors).isEqualTo(Optional.empty());
    }

    private List<Supervisor> getListOfSupervisors(){
        List<Supervisor> supervisorList = new ArrayList<>();
        supervisorList.add(Supervisor.supervisorBuilder()
                .id(1)
                .firstName("John")
                .lastName("Doe")
                .matricule("1234567")
                .password("password")
                .build());
        supervisorList.add(Supervisor.supervisorBuilder()
                .id(2)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("7654321")
                .password("password")
                .build());
        supervisorList.add(Supervisor.supervisorBuilder()
                .id(3)
                .firstName("Pipo")
                .lastName("Tito")
                .matricule("1234569")
                .password("password")
                .build());
        return supervisorList;
    }
}
