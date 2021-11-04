package com.equipe2.projet_integre_equipe2.service;

import com.equipe2.projet_integre_equipe2.model.*;
import com.equipe2.projet_integre_equipe2.repository.ContractRepository;
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
public class ContractServiceTest {

    @Mock
    private ContractRepository contractRepository;

    @InjectMocks
    private ContractService contractService;

    private Contract contract;
    private Offer offer;
    private Internship internship;
    private Monitor monitor;
    private Student student;
    private List<Contract> contractListByMonitorId = new ArrayList<>();

    @BeforeEach
    void setup() {
        monitor = Monitor.monitorBuilder()
                .id(1)
                .password("toto")
                .lastName("toto")
                .firstName("toto")
                .companyName("toto")
                .email("toto@toto.toto")
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
                .monitorEmail("toto@toto.toto")
                .isValid(false)
                .state("Invalide")
                .displayDate("2021-10-15")
                .deadlineDate("2021-10-30")
                .startInternshipDate("2021-10-30")
                .endInternshipDate("2021-12-30")
                .monitor(monitor)
                .build();

        student = Student.studentBuilder()
                .id(1)
                .firstName("Toto")
                .lastName("Tata")
                .matricule("1234567")
                .password("1234")
                .isCvValid(true)
                .build();

        internship = Internship.builder()
                .offer(offer)
                .student(student)
                .build();

        contract = Contract.builder()
                .idContract(1)
                .internship(internship)
                .collegeResponsability("Faire ceci")
                .companyResponsability("Faire des evaluation")
                .studentResponsability("Montrer la capaciter")
                .studentSignature("Signature student")
                .monitorSignature("Signature monitor")
                .adminSignature("Signature admin")
                .signatureDateStudent("2021-10-25")
                .signatureDateMonitor("2021-10-25")
                .signatureDateAdmin("2021-10-25")
                .build();

        contractListByMonitorId.add(contract);
    }

    @Test
    public void testSaveContract() {
        when(contractRepository.save(contract)).thenReturn(contract);
        Optional<Contract> actualContract = contractService.saveContract(contract);
        assertThat(actualContract.get()).isEqualTo(contract);
    }

    @Test
    public void testSaveContractFails() {
        when(contractRepository.save(contract)).thenReturn(null);
        Optional<Contract> actualContract = contractService.saveContract(contract);
        assertThat(actualContract).isEmpty();
    }

    @Test
    public void testGetContractByStudentId() {
        when(contractRepository.findContractByInternship_Student_Id(student.getId())).thenReturn(contract);
        Optional<Contract> expectedContract = contractService.getContractByStudentId(student.getId());
        assertThat(expectedContract.get()).isEqualTo(contract);
    }

    @Test
    public void testGetContractByStudentIdFails() {
        when(contractRepository.findContractByInternship_Student_Id(student.getId())).thenReturn(null);
        Optional<Contract> expectedContract = contractService.getContractByStudentId(student.getId());
        assertThat(expectedContract).isEqualTo(Optional.empty());
    }

    @Test
    public void testGetContractsByMonitorId() {
        when(contractRepository.findContractsByInternship_Offer_Monitor_Id(monitor.getId())).thenReturn(contractListByMonitorId);
        Optional<List<Contract>> actualContractList = contractService.getContractsByMonitorId(monitor.getId());
        assertThat(actualContractList.get()).isEqualTo(contractListByMonitorId);
        assertThat(actualContractList.get().size()).isEqualTo(contractListByMonitorId.size());
    }

    @Test
    public void testGetContractsByMonitorIdFails() {
        when(contractRepository.findContractsByInternship_Offer_Monitor_Id(0)).thenReturn(null);
        Optional<List<Contract>> actualContractList = contractService.getContractsByMonitorId(0);
        assertThat(actualContractList).isEqualTo(Optional.empty());
    }
}
