package com.equipe2.projet_integre_equipe2.controller;

import com.equipe2.projet_integre_equipe2.model.*;
import com.equipe2.projet_integre_equipe2.service.ContractService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(ContractController.class)
public class ContractControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ContractService contractService;

    private Contract contract;
    private Offer offer;
    private Internship internship;
    private Monitor monitor;
    private Student student;
    private List<Contract> contractListByMonitorId = new ArrayList<>();
    private String status;
    private String session;

    @BeforeEach
    void setup() {
        session = "winter2022";
        status = "Completed";

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
                .session(session)
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
    public void saveContractTest() throws Exception {
        when(contractService.saveContract(contract)).thenReturn(Optional.of(contract));

        MvcResult result = mockMvc.perform(post("/contract/save-contract")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(contract))).andReturn();

        var actualContract = new ObjectMapper().readValue(result.getResponse().getContentAsString(), Contract.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CREATED.value());
        assertThat(contract).isEqualTo(actualContract);
    }

    @Test
    public void getContractByStudentIdAndSessionTest() throws Exception {
        when(contractService.getContractByStudentIdAndSession(student.getId(), session)).thenReturn(Optional.of(contract));

        MvcResult result = mockMvc.perform(get("/contract/get-contract/{id}/session/{session}", student.getId(), session)
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actualsContract = new ObjectMapper().readValue(result.getResponse().getContentAsString(),
                Contract.class);

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualsContract).isEqualTo(contract);
    }

    @Test
    public void getContractsByMonitorIdTest() throws Exception {
        when(contractService.getContractsByMonitorId(monitor.getId())).thenReturn(Optional.of(contractListByMonitorId));

        MvcResult result = mockMvc.perform(get("/contract/get-all-by-monitor/" + monitor.getId())
                .contentType(MediaType.APPLICATION_JSON)).andReturn();

        var actualContractListByMonitorId = new ObjectMapper().readValue(result.getResponse().getContentAsString(),
                new TypeReference<List<Contract>>() {
                });

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualContractListByMonitorId).isEqualTo(contractListByMonitorId);
        assertThat(actualContractListByMonitorId.size()).isEqualTo(contractListByMonitorId.size());
    }

    @Test
    public void getContractsByMonitorIdTestFails() throws Exception {
        when(contractService.getContractsByMonitorId(0)).thenReturn(Optional.empty());

        MvcResult result = mockMvc.perform(get("/contract/get-all-by-monitor/" + 0)
                .contentType(MediaType.APPLICATION_JSON)).andReturn();

        var actualContractListByMonitorId = result.getResponse().getContentAsString();

        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
        assertThat(actualContractListByMonitorId).isEmpty();
    }

    @Test
    public void getAllContractsTest() throws Exception {
        List<Contract> contractList = getListOfContracts();
        when(contractService.getAllContracts()).thenReturn(Optional.of(contractList));

        MvcResult result = mockMvc.perform(get("/contract/get-all-contracts/")
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), List.class);
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(3);
    }


    @Test
    public void getAllContractsByMonitorIdAndStatusTest() throws Exception {
        List<Contract> contractList = getListOfCompletedContractByMonitor();
        when(contractService.getAllContractsByMonitorIdAndStatus(monitor.getId(), status))
                .thenReturn(Optional.of(contractList));

        MvcResult result = mockMvc.perform(get("/contract/get-all-by-monitor/{id}/status/{status}", monitor.getId(), status)
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<List<Contract>>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(1);
    }

    @Test
    public void getAllContractsByStudentTest() throws Exception {
        List<Contract> contractList = getListOfContractByStudent();

        when(contractService.getAllStudentContractsByStudentId(student.getId())).thenReturn(Optional.of(contractList));

        MvcResult result = mockMvc.perform(get("/contract/get-all-by-student/{id}", student.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andReturn();

        var actuals = new ObjectMapper().readValue(result.getResponse().getContentAsString(), new TypeReference<List<Contract>>() {
        });
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actuals.size()).isEqualTo(2);
    }

    @Test
    public void getContractPdfTest() throws Exception {
        byte[] bytes = {116, 101, 115, 116};
        when(contractService.generateDocument("Contract", contract)).thenReturn(Optional.of(bytes));

        MvcResult result = mockMvc.perform(post("/contract/get-contract-pdf")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(contract))).andReturn();

        var actuals = result.getResponse().getContentAsString();
        assertThat(actuals.getBytes(StandardCharsets.UTF_8)).isEqualTo(bytes);
    }

    private List<Contract> getListOfContracts() {
        List<Contract> contractList = new ArrayList<>();
        contractList.add(Contract.builder()
                .idContract(1)
                .internship(null)
                .collegeResponsability("Faire ceci")
                .companyResponsability("Faire des evaluation1")
                .studentResponsability("Montrer la capaciter")
                .studentSignature("Signature student")
                .monitorSignature("Signature monitor")
                .adminSignature("Signature admin")
                .signatureDateStudent("2021-10-25")
                .signatureDateMonitor("2021-10-25")
                .signatureDateAdmin("2021-10-25")
                .build());
        contractList.add(Contract.builder()
                .idContract(2)
                .internship(null)
                .collegeResponsability("Faire ceci")
                .companyResponsability("Faire des evaluation2")
                .studentResponsability("Montrer la capaciter")
                .studentSignature("Signature student")
                .monitorSignature("Signature monitor")
                .adminSignature("Signature admin")
                .signatureDateStudent("2021-10-25")
                .signatureDateMonitor("2021-10-25")
                .signatureDateAdmin("2021-10-25")
                .build());
        contractList.add(Contract.builder()
                .idContract(3)
                .internship(null)
                .collegeResponsability("Faire ceci")
                .companyResponsability("Faire des evaluation3")
                .studentResponsability("Montrer la capaciter")
                .studentSignature("Signature student")
                .monitorSignature("Signature monitor")
                .adminSignature("Signature admin")
                .signatureDateStudent("2021-10-25")
                .signatureDateMonitor("2021-10-25")
                .signatureDateAdmin("2021-10-25")
                .build());
        return contractList;
    }

    private List<Contract> getListOfCompletedContractByMonitor() {
        Internship internship = Internship.builder()
                .offer(offer)
                .status(status)
                .build();

        Contract contract = Contract.builder()
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

        List<Contract> listContracts = new ArrayList<>();
        listContracts.add(contract);
        return listContracts;
    }

    private List<Contract> getListOfContractByStudent() {
        List<Internship> listInternships = new ArrayList<>();
        listInternships.add(Internship.builder()
                .idInternship(100)
                .student(student)
                .build());
        listInternships.add(Internship.builder()
                .idInternship(200)
                .student(student)
                .build());

        List<Contract> contractList = new ArrayList<>();
        contractList.add(Contract.builder()
                .internship(listInternships.get(0))
                .build());

        contractList.add(Contract.builder()
                .internship(listInternships.get(1))
                .build());

        return contractList;
    }
}
