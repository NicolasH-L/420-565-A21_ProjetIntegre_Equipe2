package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.Internship;
import com.equipe2.projet_integre_equipe2.model.Offer;
import com.equipe2.projet_integre_equipe2.model.Student;
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

    private Internship internship2;

    private Offer offer;

    private Student student;

    private Supervisor supervisor;

    private String session;

    @BeforeEach
    void setup() {
        session = "winter2022";

        internship = Internship.builder()
                .offer(null)
                .student(null)
                .status(null)
                .build();

        offer = Offer.builder()
                .idOffer(1)
                .companyName("Cegep")
                .address("Montral")
                .salary("19")
                .jobTitle("Developpeur")
                .description("Java")
                .skills("Debrouillard")
                .jobSchedules("Temps plein")
                .workingHours("37.5")
                .monitorEmail("cegep@email.com")
                .isValid(false)
                .state("")
                .displayDate("2021-10-15")
                .deadlineDate("2021-10-30")
                .startInternshipDate("2021-10-30")
                .endInternshipDate("2021-12-30")
                .build();

        student = Student.studentBuilder()
                .id(1)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .isCvValid(true)
                .build();

        internship2 = Internship.builder()
                .offer(offer)
                .student(student)
                .session(session)
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
    public void testSaveInternship() {
        when(internshipRepository.save(internship)).thenReturn(internship);
        Optional<Internship> actualInternship = internshipService.saveInternship(internship);
        assertThat(actualInternship.get()).isEqualTo(internship);
    }

    @Test
    public void testSaveInternshipFails() {
        when(internshipRepository.save(internship)).thenReturn(null);
        Optional<Internship> actualInternship = internshipService.saveInternship(internship);
        assertThat(actualInternship).isEmpty();
    }

    @Test
    public void testGetListofIntershipsBySupervisorId() {
        when(internshipRepository.findInternshipsBySupervisor_Id(supervisor.getId())).thenReturn(getListOfInternships());
        final Optional<List<Internship>> allInternships = internshipService.getAllInternshipBySupervisorId(supervisor.getId());
        assertThat(allInternships.get().size()).isEqualTo(3);
        assertThat(allInternships.get().get(0).getIdInternship()).isEqualTo(1);
    }

    @Test
    public void testGetListofIntershipsBySupervisorIdFails() {
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

    @Test
    public void testGetInternshipByStudentIdAndSession() {
        when(internshipRepository.findInternshipByStudent_IdAndSession(student.getId(), session)).thenReturn(internship2);
        Optional<Internship> actualInternship = internshipService.getInternshipByStudentIdAndSession(student.getId(), session);
        assertThat(actualInternship.get()).isEqualTo(internship2);
    }

    @Test
    public void testGetInternshipByStudentIdSessionFails() {
        when(internshipRepository.findInternshipByStudent_IdAndSession(student.getId(), session)).thenReturn(null);
        Optional<Internship> actualInternship = internshipService.getInternshipByStudentIdAndSession(student.getId(), session);
        assertThat(actualInternship).isEmpty();
    }

    private List<Internship> getListOfInternships() {
        List<Internship> internshipList = new ArrayList<>();
        internshipList.add(internship = Internship.builder()
                .idInternship(1)
                .offer(null)
                .student(null)
                .status("StudentSignature")
                .build());
        internshipList.add(internship = Internship.builder()
                .idInternship(2)
                .offer(null)
                .student(null)
                .status(null)
                .build());
        internshipList.add(internship = Internship.builder()
                .idInternship(3)
                .offer(null)
                .student(null)
                .status(null)
                .build());
        return internshipList;
    }
}
