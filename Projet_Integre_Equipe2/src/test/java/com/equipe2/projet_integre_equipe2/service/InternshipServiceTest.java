package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Internship;
import com.equipe2.projet_integre_equipe2.model.Supervisor;
import com.equipe2.projet_integre_equipe2.repository.InternshipRepository;
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
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class InternshipServiceTest {

    @Mock
    private InternshipRepository internshipRepository;

    @InjectMocks
    private InternshipService internshipService;

    private Internship internship;

    private Supervisor supervisor;

    @BeforeEach
    void setup() {
        internship = Internship.builder()
                .isSignedByStudent(false)
                .isSignedByMonitor(false)
                .offer(null)
                .student(null)
                .status(null)
                .build();

        supervisor = Supervisor.supervisorBuilder()
                .id(1)
                .firstName("toto")
                .lastName("tata")
                .matricule("1234567")
                .password("password")
                .build();
    }

    @Test
    public void testSaveInternship(){
        when(internshipRepository.save(internship)).thenReturn(internship);
        Optional<Internship> actualInternship = internshipService.saveInternship(internship);
        assertThat(actualInternship.get()).isEqualTo(internship);
    }

    @Test
    public void testSaveInternshipFails(){
        when(internshipRepository.save(internship)).thenReturn(null);
        Optional<Internship> actualInternship = internshipService.saveInternship(internship);
        assertThat(actualInternship).isEmpty();
    }

    @Test
    public void testGetListofIntershipsBySupervisorId(){
        when(internshipRepository.findInternshipsBySupervisor_Id(supervisor.getId())).thenReturn(getListOfInternships());
        final Optional<List<Internship>> allInternships = internshipService.getAllInternshipBySupervisorId(supervisor.getId());
        assertThat(allInternships.get().size()).isEqualTo(3);
        assertThat(allInternships.get().get(0).getIdInternship()).isEqualTo(1);
    }

    @Test
    public void testGetListofIntershipsBySupervisorIdFails(){
        when(internshipRepository.findInternshipsBySupervisor_Id(supervisor.getId())).thenReturn(null);
        final Optional<List<Internship>> allInternships = internshipService.getAllInternshipBySupervisorId(supervisor.getId());
        assertThat(allInternships).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetAllInternships() {
        when(internshipRepository.findAll()).thenReturn(getListOfInternships());
        Optional<List<Internship>> allInternships = internshipService.getAllInternships();
        assertThat(allInternships.get().size()).isEqualTo(3);
        assertThat(allInternships.get().get(0).getStatus()).isEqualTo("StudentSignature");
    }

    @Test
    public void testGetAllInternshipsFails() {
        when(internshipRepository.findAll()).thenReturn(null);
        final Optional<List<Internship>> allInternships = internshipService.getAllInternships();
        assertThat(allInternships).isEqualTo(Optional.empty());
    }

    private List<Internship> getListOfInternships() {
        List<Internship> internshipList = new ArrayList<>();
        internshipList.add(internship = Internship.builder()
                .idInternship(1)
                .isSignedByStudent(false)
                .isSignedByMonitor(false)
                .offer(null)
                .student(null)
                .status("StudentSignature")
                .build());
        internshipList.add(internship = Internship.builder()
                .idInternship(2)
                .isSignedByStudent(false)
                .isSignedByMonitor(false)
                .offer(null)
                .student(null)
                .status(null)
                .build());
        internshipList.add(internship = Internship.builder()
                .idInternship(3)
                .isSignedByStudent(false)
                .isSignedByMonitor(false)
                .offer(null)
                .student(null)
                .status(null)
                .build());
        return internshipList;
    }
}
